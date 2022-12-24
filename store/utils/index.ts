/* eslint-disable import/no-unresolved */
import { dashboardOrgDataActions } from "@store/dashboard/dashboard-org-data";
import { dashboardHomeActions } from "@store/dashboard/dashboard-home";
import { dashboardEventsActions } from "@store/dashboard/dashboard-events";
import { organizationPaymentAPIsDataActions } from "@store/payment-apis/";
import { removeAuthToken, removeCookie } from "@lib/utils/cookies";

const { removeDashboardOrgData } = dashboardOrgDataActions;
const { removeDashboardHomeData } = dashboardHomeActions;
const { removeDashboardEventsData } = dashboardEventsActions;
const { removeOrganizationPaymentAPIs } = organizationPaymentAPIsDataActions;

const clearDashboardSlicesAndLogoutUser = () => (dispatch: any) => {
  // clear DashboardOrgData slice
  dispatch(removeDashboardOrgData());
  // clear DashboardHome slice
  dispatch(removeDashboardHomeData());
  // clear DashboardEvents slice
  dispatch(removeDashboardEventsData());
  // clear DashboardUserProfessionalInformation slic
  // clear OrganizationPaymentAPIs slice
  dispatch(removeOrganizationPaymentAPIs());
  // clear UserData slice

  // remove userToken cookie
  removeCookie("membershipJoinRequestId");
  removeCookie("isOrgAdmin");
  removeAuthToken();
};

export default clearDashboardSlicesAndLogoutUser;
