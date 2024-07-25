/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSighting = /* GraphQL */ `
  mutation CreateSighting(
    $input: CreateSightingInput!
    $condition: ModelSightingConditionInput
  ) {
    createSighting(input: $input, condition: $condition) {
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
export const updateSighting = /* GraphQL */ `
  mutation UpdateSighting(
    $input: UpdateSightingInput!
    $condition: ModelSightingConditionInput
  ) {
    updateSighting(input: $input, condition: $condition) {
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
export const deleteSighting = /* GraphQL */ `
  mutation DeleteSighting(
    $input: DeleteSightingInput!
    $condition: ModelSightingConditionInput
  ) {
    deleteSighting(input: $input, condition: $condition) {
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
