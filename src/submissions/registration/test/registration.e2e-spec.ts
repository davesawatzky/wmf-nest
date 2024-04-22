import request from 'supertest-graphql'
import gql from 'graphql-tag'
import {Registration, RegistrationPayload} from '../entities/registration.entity'
import {RegistrationInput} from '../dto/registration.input'
import {User} from '../../../user/entities/user.entity'
import {UserError} from '../../../common.entity'
import {RegisteredClass} from '../../registered-class/entities/registered-class.entity'
import {Group} from '../../group/entities/group.entity'
import {Community} from '../../community/entities/community.entity'
import {School} from '../../school/entities/school.entity'

describe('Registration', () => {

  describe('Read all registrations', () => {

    it('Should return registration list', () => {
    
    })
  })
})

