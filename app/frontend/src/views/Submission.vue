<template>
  <v-container>
    <BaseSecure admin>
      <v-card class="elevation-2 mx-auto mt-10 ipc-wrapper">
        <v-toolbar flat color="grey lighten-3">
          <v-card-title>Silviculture Workplace Safety for COVID-19</v-card-title>
          <!-- <router-link :to="{ name: 'Admin'}" class="pdf-link">
            <v-icon color="red">picture_as_pdf</v-icon>
          </router-link>-->
        </v-toolbar>

        <v-container class="px-8">
          <h4 class="mt-5">{{ ipcPlanData.business.name }}</h4>
          <ul>
            <li>Submitted:{{ new Date(ipcPlanData.ipcPlan.createdAt).toLocaleString() }}</li>
            <li>
              Confirmation ID:
              {{ ipcPlanData.confirmationId }}
            </li>
          </ul>

          <h4 class="mt-5">Contact Details</h4>

          <ul class="mt-2">
            <li>Name: {{ ipcPlanData.contacts[0].firstName + ' ' + ipcPlanData.contacts[0].lastName }}</li>
            <li>Phone: {{ ipcPlanData.contacts[0].phone1 }}</li>
            <li>Email: {{ ipcPlanData.contacts[0].email }}</li>
          </ul>
          <h4 class="mt-5 mb-2">COVID-19 Information</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Signage in place in the appropriate language on how employees can protect themselves from COVID-19</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.protectionSignage">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Someone identified that workers can go to if they have questions on COVID-19</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.workerContactPersonnel">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Medical Health Officer contacted</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.mhoContacted">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Provide safe lodging and accommodation: General Worker</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Common areas allow physical distancing of 2m / 6ft at all times</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.commonAreaDistancing">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div class="float-left">Shared sleeping area or single beds</div>
                    <div
                      class="float-right"
                    >{{ (ipcPlanData.ipcPlan.sleepingAreaType == 1) ? 'Individual beds or single beds' : 'Shared sleeping areas' }}</div>
                  </td>
                </tr>
                <template v-if="ipcPlanData.ipcPlan.sleepingAreaType == 2">
                  <tr>
                    <td>Number of people in a room</td>
                    <td>{{ ipcPlanData.ipcPlan.sharedSleepingPerRoom }}</td>
                  </tr>
                  <tr>
                    <td>Beds in the right configuration with the right distance apart</td>
                    <td>
                      <v-icon
                        color="green"
                        v-if="ipcPlanData.ipcPlan.sharedSleepingDistancing"
                      >check</v-icon>
                      <v-icon color="red" v-else>close</v-icon>
                    </td>
                  </tr>
                </template>
                <tr>
                  <td>Understands what is needed for a person to self-isolate.</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.selfIsolateUnderstood">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Worker can self-isolate</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.selfIsolateAccommodation">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Laundry services available for regular use</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.laundryServices">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Disposable gloves for the handling of garbage</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.wasteManagementGloves">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Waste removal schedule</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.wasteManagementSchedule">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>You have sturdy, leak-resistant garbage bags</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.wasteManagementBags">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Adequate number of hand washing stations (either permanent or portable) available to workers</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.handWashingStations">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Appropriate supply of soap and water</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.handWashingSoapWater">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Supplemented with waterless hand sanitizers with a min of 60% alcohol where appropriate</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.handWashingWaterless">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has provided disposable paper towels</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.handWashingPaperTowels">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has put up signs to promote regular hand washing</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.handWashingSignage">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Provide safe lodging and accommodation: General Worker</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Has sleeping arrangements that maintains physical distancing or uses physical barriers</td>
                  <td>
                    <v-icon
                      color="green"
                      v-if="ipcPlanData.ipcPlan.distancingSleepingBarriers"
                    >check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has physical barriers like face shields or masks for situations where physical distancing is not possible</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.distancingFaceShields">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.disinfectingSchedule">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Implement COVID-19 Employee Education</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Has signage in place in the appropriate language on how employees can protect themselves from COVID-19</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.educationSignage">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has someone identified that workers can go to if they have questions on COVID-19</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.educationContactPersonnel">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Train Workers on COVID-19 infection control</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Has materials ready on the risk of exposure of COVID-19 and the signs and symptoms of the disease</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.trainingCovid19">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has materials ready on hand washing, physical distancing, and cough/sneeze etiquette</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.trainingEtiquette">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Can provide locations of washing facilities, including dispensing stations for alcohol-based hand rubs</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.trainingLocations">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has materials ready on how to seek first aid</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.trainingFirstAid">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Has materials ready on how to report an exposure to or symptoms of COVID-19</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.trainingReporting">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Meals Preparation: Practice safe food handling</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Has schedules in place for kitchen/eating areas to limit contact and maintain 2 metre physical distancing</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.mealsDistancing">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Each employee has their own dishware, utensils and drinking cup</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.mealsDishware">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Used dishware will be washed immediately</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.mealsDishwashing">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Plan to manage individuals with suspected COVID-19 Infection</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Is prepared to promptly separate the individual from others in their own accommodation</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectionSeparation">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Is prepared to provide individuals exhibiting symptoms of COVID-19 with a surgical/procedural mask or tissues to cover their mouth and nose</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectionSymptoms">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Is prepared to direct the person to call HealthLinkBC (8-1-1)</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectionHeathLinkBC">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>Is prepared to clean and disinfect any rooms that the person has been in while symptomatic</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectionSanitization">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
                <tr>
                  <td>If commercial accommodation is being used to self-isolate, then you will inform management of the situation and necessary requirements.</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectionAccommodation">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Providing Food for Ill Workers</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Is able to provide food in a safe manner to a self-isolated worker</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectedFeeding">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Housekeeping for Ill-Workers</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Is able to perform adequate housekeeping for a self isolated worker</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectedHousekeeping">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Waste Management for Ill-Workers</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Is able to perform waste management for supporting a self-isolated worker</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.infectedWaste">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <h4 class="mt-5 mb-2">Certification</h4>
          <v-simple-table dense>
            <template>
              <tbody>
                <tr>
                  <td>Certified this information to be accurate</td>
                  <td>
                    <v-icon
                      color="green"
                      v-if="ipcPlanData.ipcPlan.certifyAccurateInformation"
                    >check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>

                <tr>
                  <td>Agreed that farm will be subject to a site inspection</td>
                  <td>
                    <v-icon color="green" v-if="ipcPlanData.ipcPlan.agreeToInspection">check</v-icon>
                    <v-icon color="red" v-else>close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>

      <router-link :to="{ name: 'Admin'}">
        <v-btn color="primary" class="mt-5">Back</v-btn>
      </router-link>
    </BaseSecure>
  </v-container>
</template>

<script>
import ipcService from '@/services/ipcService';

export default {
  name: 'Submission',
  components: {
  },
  data() {
    return {
      ipcPlanId: '' ,
      ipcPlanData: ''
    };
  },
  methods: {
    // get form data from frontend service layer
    getData() {
      ipcService
        .getIPCContent(this.$route.params.ipcPlanId)
        .then(response => {
          const data = response.data;
          // add to component's data
          this.ipcPlanData = data;
        })
        .catch(() => {
          this.showTableAlert('error', 'No response from server');
        });
    },

  },
  mounted() {
    this.getData();
    // TODO: add data to the vuex store
  }
};
</script>
<style lang="scss" scoped>
.ipc-wrapper {
  ul,
  ul li {
    padding: 0;
    list-style-type: none;
  }
  table tr > td {
    padding-left: 0;
    width: 95%;
  }
}
</style>
