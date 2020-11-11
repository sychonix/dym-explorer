import { DocumentNode } from 'graphql'
import { checkAddressVariables } from '@app/modules/favorite-tokens/handlers/apolloTypes/checkAddress'

export interface CheckAddressRefetch {
    query: DocumentNode
    variables: checkAddressVariables
}
