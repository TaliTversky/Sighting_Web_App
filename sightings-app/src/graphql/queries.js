/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getObservation = /* GraphQL */ `
  query GetObservation($id: ID!) {
    getObservation(id: $id) {
      id
      date
      time
      timeName
      reportType
      site
      country
      specieCommonName
      specie
      count
      reporter
      photographer
      mediaSource
      stage
      sex
      condition
      length
      diskLength
      width
      depth
      distance
      temperature
      latitude
      longitude
      description
      comments
      urlLinks
      byUser
      group
      checkedByUser
      substrate
      weight
      labels
      Media
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listObservations = /* GraphQL */ `
  query ListObservations(
    $filter: ModelObservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        time
        timeName
        reportType
        site
        country
        specieCommonName
        specie
        count
        reporter
        photographer
        mediaSource
        stage
        sex
        condition
        length
        diskLength
        width
        depth
        distance
        temperature
        latitude
        longitude
        description
        comments
        urlLinks
        byUser
        group
        checkedByUser
        substrate
        weight
        labels
        Media
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      Image
      specie
      Date
      time
      place
      type
      quality
      lifeStage
      activity
      characters
      behavior
      observationID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMedia = /* GraphQL */ `
  query ListMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Image
        specie
        Date
        time
        place
        type
        quality
        lifeStage
        activity
        characters
        behavior
        observationID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const mediaByObservationID = /* GraphQL */ `
  query MediaByObservationID(
    $observationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    mediaByObservationID(
      observationID: $observationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Image
        specie
        Date
        time
        place
        type
        quality
        lifeStage
        activity
        characters
        behavior
        observationID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
