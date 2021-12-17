/* eslint-disable */
const participantCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  dateOfBirth: date().isRequired(),
  passNum: uu5String().isRequired(),
  tripId: id(),
  passExpiry: date().isRequired(),
  telNumber: string(255).isRequired()
})
const participantUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    dateOfBirth: date(),
    passNum: string(),
    passExpiry: date(),
    telNumber: string(255),
    tripId: id()
  })

  const participantListDtoInType = shape({
    sortBy: oneOf(["name", "trip"]),
    order: oneOf(["asc", "desc"]),
    tripId: id(),
    state: oneOf(["active", "inactive"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  })
  const participantGetDtoInType = shape({
    id: id().isRequired()
   
  })
  const participantSetStateDtoInType = shape({
    id: id().isRequired(),
    state: oneOf(["active","inactive"]), 
  })