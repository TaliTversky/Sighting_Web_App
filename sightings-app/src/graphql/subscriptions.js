/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSighting = /* GraphQL */ `
  subscription OnCreateSighting($filter: ModelSubscriptionSightingFilterInput) {
    onCreateSighting(filter: $filter) {
      id
      date
      Site
      speciesCommonName
      speciesScienceName
      species
      count
      reporter
      labels
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSighting = /* GraphQL */ `
  subscription OnUpdateSighting($filter: ModelSubscriptionSightingFilterInput) {
    onUpdateSighting(filter: $filter) {
      id
      date
      Site
      speciesCommonName
      speciesScienceName
      species
      count
      reporter
      labels
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSighting = /* GraphQL */ `
  subscription OnDeleteSighting($filter: ModelSubscriptionSightingFilterInput) {
    onDeleteSighting(filter: $filter) {
      id
      date
      Site
      speciesCommonName
      speciesScienceName
      species
      count
      reporter
      labels
      createdAt
      updatedAt
      __typename
    }
  }
`;
