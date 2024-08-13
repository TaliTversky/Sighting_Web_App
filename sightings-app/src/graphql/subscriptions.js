/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateObservation = /* GraphQL */ `
  subscription OnCreateObservation(
    $filter: ModelSubscriptionObservationFilterInput
  ) {
    onCreateObservation(filter: $filter) {
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
      Media
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateObservation = /* GraphQL */ `
  subscription OnUpdateObservation(
    $filter: ModelSubscriptionObservationFilterInput
  ) {
    onUpdateObservation(filter: $filter) {
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
      Media
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteObservation = /* GraphQL */ `
  subscription OnDeleteObservation(
    $filter: ModelSubscriptionObservationFilterInput
  ) {
    onDeleteObservation(filter: $filter) {
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
      Media
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia($filter: ModelSubscriptionMediaFilterInput) {
    onCreateMedia(filter: $filter) {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia($filter: ModelSubscriptionMediaFilterInput) {
    onUpdateMedia(filter: $filter) {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia($filter: ModelSubscriptionMediaFilterInput) {
    onDeleteMedia(filter: $filter) {
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
