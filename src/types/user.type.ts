export const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
}

export type GenderType = typeof Gender[keyof typeof Gender];


export const Role = {
    USER: "USER",
    ADMIN: "ADMIN",
}

export type RoleType = typeof Role[keyof typeof Role];