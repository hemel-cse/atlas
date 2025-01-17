import { Transform } from '@graphql-tools/delegate'

// remove views field from the query node video request
export const RemoveQueryNodeVideoViewsField: Transform = {
  transformRequest: (request) => {
    request.document = {
      ...request.document,
      definitions: request.document.definitions.map((definition) => {
        if (definition.kind === 'FragmentDefinition' && definition.name.value === 'VideoFields') {
          return {
            ...definition,
            selectionSet: {
              ...definition.selectionSet,
              selections: definition.selectionSet.selections.filter((selection) => {
                return selection.kind !== 'Field' || selection.name.value !== 'views'
              }),
            },
          }
        }
        return definition
      }),
    }
    return request
  },
}

// remove views field from the query node video request
export const RemoveQueryNodeChannelViewsField: Transform = {
  transformRequest: (request) => {
    request.document = {
      ...request.document,
      definitions: request.document.definitions.map((definition) => {
        if (definition.kind === 'FragmentDefinition' && definition.name.value === 'AllChannelFields') {
          return {
            ...definition,
            selectionSet: {
              ...definition.selectionSet,
              selections: definition.selectionSet.selections.filter((selection) => {
                return selection.kind !== 'Field' || selection.name.value !== 'views'
              }),
            },
          }
        }
        return definition
      }),
    }
    return request
  },
}
