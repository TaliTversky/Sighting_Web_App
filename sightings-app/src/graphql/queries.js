/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSighting = /* GraphQL */ `
  query GetSighting($id: ID!) {
    getSighting(id: $id) {
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
export const listSightings = /* GraphQL */ `
  query ListSightings(
    $filter: ModelSightingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSightings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
