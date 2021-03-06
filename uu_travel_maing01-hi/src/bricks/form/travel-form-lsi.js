const Lsi = {
  header: {
    en: "Modify trip info",
  },
  info: {
    en: "<uu5string/>On this form you can change state of trip.",
  },
  submit: (param) => {
    return {
      en: `Submit ${param}`,
    };
  },
  cancel: {
    en: "Cancel",
  },
  state: {
    en: "State",
  },
  description: {
    en: "Description",
  },
  saveError: {
    en: "Saving was failed",
  },
  saveSuccess: {
    en: "Saving was failed",
  },
  wrongDescLength: {
    en: "Value should be not longer then 5000 symbols.",
  },
  name: {
    en: "Name",
    cs: "Název",
  },
  capacity: {
    en: "capacity",
    cs: "množství",
  },
  startDate: {
    en: "Starting date",
    cs: "Počáteční datum",
  },
  price: {
    en: "Price",
    cs: "Cena",
  },
  location: {
    en: "Select location",
    cs: "Vyberte umístění",
  },
};

//viewOn:exports
export default Lsi;
//viewOff:exports
