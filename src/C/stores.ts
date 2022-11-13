import { writable } from 'svelte/store'
import type { Auth } from 'firebase/auth'
import type { User } from './db'

export const _view = writable("upgrades")

export const _auth = writable<Auth>()

export const _user = writable<User>(undefined)
