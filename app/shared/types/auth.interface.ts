import { NextPage } from 'next'

export type TypeRoles = {
	isOnlyAdmin?: boolean
	isOnlyUser?: boolean
}

//  pages  içindeki NextPage yerine kendi NextAuth Pagemizi yaptık
export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

// burada TYpeRroles tipine uyan bir component gönderdik
export type TypeComponentAuthFields = { Component: TypeRoles }
