import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from ".";
import { User } from "./models/user";
import { UserRole } from "./roles";

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

export const permissions: Record<UserRole, PermissionsByRole> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ADMIN(user, { can, cannot }) {
    can("manage", "all");
    // As regras abaixo não poderiam ser com negação do user.id duretamente,
    // pois a ferramenta não consegue trabalhar desta forma.
    // Então temos que negar tudo e depois permitir o que queremos.
    // cannot(["transfer_ownership", "update"], "Organization");
    // can(["transfer_ownership", "update"], "Organization", {
    //   ownerId: { $eq: user.id },
    // });
  },
  MEMBER(user, { can }) {
    can("manage", "all");
    can(["create", "get"], "Project");
    can(["update", "delete"], "Project", { ownerId: { $eq: user.id } });
  },
  VIEWER(_, { can }) {
    can("get", "Project");
  },
};
