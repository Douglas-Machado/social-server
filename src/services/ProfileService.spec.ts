import { prismaMock } from '../prisma/singleton'

import { ProfileService } from './ProfileService'
const profileService = new ProfileService()

const profile = {
  id: '52d3aef6-00a6-4bea-b6aa-3131eaa98888',
  biography: 'Lorem ipsum...',
  user_id: 'f8e084bc-31b2-4c26-b97f-0cbe2a49a1d2',
  created_at: new Date(),
  updated_at: new Date(),
}

const profileParams = {
  biography: 'Lorem ipsum...',
  userId: '52d3aef6-00a6-4bea-b6aa-3131eaa98ass',
}

describe('Profiles', () => {
  test('Should create the user profile', async () => {
    prismaMock.profile.create.mockResolvedValue(profile)

    await expect(profileService.createProfile(profileParams)).resolves.toEqual({
      profile,
    })
  })
  // test('Should not create profile if already exist', async () => {
  //   prismaMock.profile.create.mockResolvedValue(profile)
  //   await expect(profileService.createProfile(profileParams)).rejects.toEqual({
  //     profile,
  //   })
  // })
})
