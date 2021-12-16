/* eslint-disable */
const tripCreateDtoInType = shape({
    name: string(255).isRequired(),
    capacity: integer(100).isRequired(),
    price: number(10000).isRequired(),
    locationId: id().isRequired(),
    participantIdList: array(id(), 100),
    startingDate: date().isRequired()   
  })    

  const tripGetDtoInType = shape({
    id: id().isRequired()
   })

   const tripDeleteDtoInType = shape({
    id: id().isRequired()
   })

   const tripSetStateDtoInType = shape({
    id: id().isRequired(),
    state: oneOf(["active","pending","closed"]),  
  })
  
  const tripUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    capacity: integer(100),
    price: number(10000),
    locationId: id(),
    participantIdList: array(id(), 100),
    startingDate: date()   
  })