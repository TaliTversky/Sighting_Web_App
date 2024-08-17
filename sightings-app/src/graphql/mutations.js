/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createObservation = /* GraphQL */ `
  mutation CreateObservation(
    $input: CreateObservationInput!
    $condition: ModelObservationConditionInput
  ) {
    createObservation(input: $input, condition: $condition) {
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
export const updateObservation = /* GraphQL */ `
  mutation UpdateObservation(
    $input: UpdateObservationInput!
    $condition: ModelObservationConditionInput
  ) {
    updateObservation(input: $input, condition: $condition) {
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
export const deleteObservation = /* GraphQL */ `
  mutation DeleteObservation(
    $input: DeleteObservationInput!
    $condition: ModelObservationConditionInput
  ) {
    deleteObservation(input: $input, condition: $condition) {
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
export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
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
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
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
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
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
