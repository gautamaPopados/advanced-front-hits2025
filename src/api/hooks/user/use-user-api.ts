import { ApiMethod, FindAllUsersResponse } from "../../../@types/api";
import { buildQueryParams } from "../../../utils/api/functions";
import { routes } from "../../../utils/constants/api";
import { useAuthContext } from "../auth/use-auth-context";

// export const useUserApi = () => {
//   const { sendAuthGuardedRequest } = useAuthContext();

// //   const findAllUsers = async (
// //     limit: number,
// //     offset: number,
// //   ): Promise<FindAllUsersResponse> => {
// //     const queryString = buildQueryParams([
// //       { key: "limit", value: limit.toString() },
// //       { key: "offset", value: offset.toString() },
// //     ]);

// //     return sendAuthGuardedRequest(
// //       ApiMethod.GET,
// //       routes.user.findAll + queryString,
// //     );
// //   };

// //   const findOneUser = async (id: number): Promise<User> => {
// //     return sendAuthGuardedRequest(ApiMethod.GET, routes.user.findOne(id));
// //   };

//   return { findAllUsers, findOneUser };
// };