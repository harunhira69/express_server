export const role = ['contributor','maintainer'] as const

type Role = typeof role[number]

export type Users = {
    name:string,
    email:string,
    password:string,
    role?:Role,
    created_at?:Date,
    updated_at?:Date
}