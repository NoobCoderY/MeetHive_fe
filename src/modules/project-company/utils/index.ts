 export const transformRole=(role: string): string=> {

   const lastPart: string = role.substring(role.lastIndexOf('_') + 1);

   const transformedRole: string =
     lastPart.charAt(0).toUpperCase() + lastPart.slice(1).toLowerCase();

   return transformedRole;
}

