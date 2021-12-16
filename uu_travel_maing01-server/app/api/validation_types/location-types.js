/* eslint-disable */

const locationCreateDtoInType = shape({
  name: string(200).isRequired(),
  country: string(200).isRequired(),
  city: string(200).isRequired(),
  address: string(300).isRequired(),
  visa: boolean().isRequired(),
  category: integer(2),
  image: binary(),
});

const locationGetDtoInType = shape({
  id: id().isRequired(),
});

const locationSetStateDtoInType = shape({
  id: id().isRequired(),
  state: oneOf(["active", "underConstruction", "closed"])
})

const locationDeleteDtoInType = shape({
  id: id().isRequired(),
});
const locationListDtoInType = shape({
  sortBy: string(200),
  order: oneOf(["asc", "desc"]),
 
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})

const locationUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(200),
  country: string(200),
  city: string(200),
  address: string(300),
  visa: boolean(),
  category: integer(2),
  state: oneOf(["active", "under construction", "closed"]),
  image: binary(),
});
