module.exports = {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.sequelize.query('CREATE TABLE logged_actions (\n' +
        '    schema_name text NOT NULL,\n' +
        '    TABLE_NAME text NOT NULL,\n' +
        '    user_name text,\n' +
        '    action_tstamp TIMESTAMP WITH TIME zone NOT NULL DEFAULT CURRENT_TIMESTAMP,\n' +
        '    action TEXT NOT NULL CHECK (action IN (\'I\',\'D\',\'U\')),\n' +
        '    original_data text,\n' +
        '    new_data text,\n' +
        '    query text\n' +
        ') WITH (fillfactor=100)',
      {
        transaction: t
      }).then(() => {
        return queryInterface.sequelize.query('REVOKE ALL ON logged_actions FROM public;',
          {
            transaction: t
          });
      }).then(() => {
        return queryInterface.sequelize.query('GRANT SELECT ON logged_actions TO public;',
          {
            transaction: t
          });
      }).then(() => {
        return queryInterface.sequelize.query('CREATE INDEX logged_actions_schema_table_idx ON logged_actions(((schema_name||\'.\'||TABLE_NAME)::TEXT));',
          {
            transaction: t
          });
      }).then(() => {
        return queryInterface.sequelize.query('CREATE INDEX logged_actions_action_tstamp_idx ON logged_actions(action_tstamp);',
          {
            transaction: t
          });
      }).then(() => {
        return queryInterface.sequelize.query('CREATE INDEX logged_actions_action_idx ON logged_actions(action);',
          {
            transaction: t
          });
      }).then(() => {
        return queryInterface.sequelize.query('CREATE OR REPLACE FUNCTION if_modified_func() RETURNS TRIGGER AS $body$\n' +
          'DECLARE\n' +
          '    v_old_data TEXT;\n' +
          '    v_new_data TEXT;\n' +
          'BEGIN\n' +
          '    /* This dance with casting the NEW and OLD values to a ROW is not necessary in pg 9.0+ */\n' +
          '    IF (TG_OP = \'UPDATE\') THEN\n' +
          '        v_old_data := ROW(OLD.*);\n' +
          '        v_new_data := ROW(NEW.*);\n' +
          '        INSERT INTO logged_actions (schema_name,table_name,user_name,action,original_data,new_data,query) \n' +
          '        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_old_data,v_new_data, current_query());\n' +
          '        RETURN NEW;\n' +
          '    ELSIF (TG_OP = \'DELETE\') THEN\n' +
          '        v_old_data := ROW(OLD.*);\n' +
          '        INSERT INTO logged_actions (schema_name,table_name,user_name,action,original_data,query)\n' +
          '        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_old_data, current_query());\n' +
          '        RETURN OLD;\n' +
          '    ELSIF (TG_OP = \'INSERT\') THEN\n' +
          '        v_new_data := ROW(NEW.*);\n' +
          '        INSERT INTO logged_actions (schema_name,table_name,user_name,action,new_data,query)\n' +
          '        VALUES (TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,session_user::TEXT,substring(TG_OP,1,1),v_new_data, current_query());\n' +
          '        RETURN NEW;\n' +
          '    ELSE\n' +
          '        RAISE WARNING \'[IF_MODIFIED_FUNC] - Other action occurred: %, at %\',TG_OP,now();\n' +
          '        RETURN NULL;\n' +
          '    END IF;\n' +
          ' \n' +
          'EXCEPTION\n' +
          '    WHEN data_exception THEN\n' +
          '        RAISE WARNING \'[IF_MODIFIED_FUNC] - UDF ERROR [DATA EXCEPTION] - SQLSTATE: %, SQLERRM: %\',SQLSTATE,SQLERRM;\n' +
          '        RETURN NULL;\n' +
          '    WHEN unique_violation THEN\n' +
          '        RAISE WARNING \'[IF_MODIFIED_FUNC] - UDF ERROR [UNIQUE] - SQLSTATE: %, SQLERRM: %\',SQLSTATE,SQLERRM;\n' +
          '        RETURN NULL;\n' +
          '    WHEN OTHERS THEN\n' +
          '        RAISE WARNING \'[IF_MODIFIED_FUNC] - UDF ERROR [OTHER] - SQLSTATE: %, SQLERRM: %\',SQLSTATE,SQLERRM;\n' +
          '        RETURN NULL;\n' +
          'END;\n' +
          '$body$\n' +
          'LANGUAGE plpgsql\n' +
          'SECURITY DEFINER\n' +
          'SET search_path = pg_catalog, public;\n',
        {
          transaction: t
        }).then(() => {
          return queryInterface.sequelize.query('CREATE TRIGGER business_audit\n' +
            'AFTER UPDATE OR DELETE ON business\n' +
            'FOR EACH ROW EXECUTE PROCEDURE if_modified_func()',
          {
            transaction: t
          });
        }).then(() => {
          return queryInterface.sequelize.query('CREATE TRIGGER contact_audit\n' +
            'AFTER UPDATE OR DELETE ON contact\n' +
            'FOR EACH ROW EXECUTE PROCEDURE if_modified_func()',
          {
            transaction: t
          });
        }).then(() => {
          return queryInterface.sequelize.query('CREATE TRIGGER location_audit\n' +
            'AFTER UPDATE OR DELETE ON location\n' +
            'FOR EACH ROW EXECUTE PROCEDURE if_modified_func()',
          {
            transaction: t
          });
        });
      });
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.sequelize.query('drop trigger if exists location_audit ON location cascade;',
        {transaction: t})
        .then(() => {
          return queryInterface.sequelize.query('drop trigger if exists contact_audit ON contact cascade;', {
            transaction: t
          });
        })
        .then(() => {
          return queryInterface.sequelize.query('drop trigger if exists business_audit ON business cascade;', {
            transaction: t
          });
        })
        .then(() => {
          return queryInterface.sequelize.query('drop function if exists if_modified_func() cascade;', {
            transaction: t
          });
        }).then(() => {
          return queryInterface.dropTable('logged_actions', {
            transaction: t
          });
        });
    });
  }
};
