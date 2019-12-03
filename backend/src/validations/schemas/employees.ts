const getEmployeesByCompany : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: 'number',
      required: true
    }
  }
}

const getEmployeeByIdInCompany : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: 'number',
      required: true
    },
    employeeId: {
      type: 'number',
      required: true
    }
  }
}

const createPersonalData : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {

    spolecnost: {
      type: 'number',
      required: true
    },

    meno: {
      type: 'string',
      maxLength: 255,
      required: true
    },

    stredne_meno: {
      type: 'string',
      maxLength: 255
    },

    priezvisko: {
      type: 'string',
      maxLength: 255,
      required: true
    },

    rodne_cislo: {
      type: 'string',
      maxLength: 10,
      required: true
    },

    datum_nar: {
      type: 'string',
      format: 'date',
      required: true
    },

    pohlavie: {
      type: 'string',
      maxLength: 1,
      required: true
    },

    statna_prislusnost: {
      type: 'string',
      maxLength: 20,
      required: true
    },

    miesto_narodenia: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    stav: {
      type: 'string',
      maxLength: 1,
      required: true
    },

    obciansky: {
      type: 'string',
      maxLength: 25,
      required: true
    },

    pas: {
      type: 'string',
      maxLength: 25,
    },

    osobne_cislo: {
      type: 'string',
      maxLength: 10,
      required: true
    },

    externe_osobne_cislo: {
      type: 'string',
      maxLength: 20,
    },

    aktivny: {
      type: 'boolean',
      required: true
    },
    
    funkcia: {
      type: 'string',
      maxLength: 50,
      required: true
    },

    pozicia: {
      type: 'string',
      maxLength: 50,
      required: true
    },

    oddelenie: {
      type: 'string',
      maxLength: 20,
      required: true
    },

    pobocka: {
      type: 'string',
      maxLength: 20,
      required: true
    },

    stredisko: {
      type: 'string',
      maxLength: 10,
      required: true
    },

    nastup: {
      type: 'string',
      format: 'date',
      required: true
    },

    ukoncenie: {
      type: 'string',
      format: 'date',
      required: true
    },

    pozn: {
      type: 'string',
      maxLength: 255
    },
    
    adresa_ulica_prechodne: {
      type: 'string',
      maxLength: 100
    },
    
    adresa_cislo_popisne_prechodne: {
      type: 'string',
      maxLength: 100
    },

    adresa_cislo_domu_prechodne: {
      type: 'string',
      maxLength: 100
    },

    psc_prechodne: {
      type: 'string',
      maxLength: 6
    },

    mesto_prechodne: {
      type: 'string',
      maxLength: 100
    },

    okres_prechodne: {
      type: 'string',
      maxLength: 100
    },

    kraj_prechodne: {
      type: 'string',
      maxLength: 100
    },

    krajina_prechodne: {
      type: 'string',
      maxLength: 100
    },
    
    adresa_ulica_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    adresa_cislo_popisne_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    adresa_cislo_domu_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    psc_trvale: {
      type: 'string',
      maxLength: 6,
      required: true
    },

    mesto_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    okres_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    kraj_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    krajina_trvale: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    telefon_pracovny: {
      type: 'string',
      maxLength: 25,
      required: true
    },

    telefon_sukromny: {
      type: 'string',
      maxLength: 25
    },

    telefon_iny: {
      type: 'string',
      maxLength: 25
    },

    skype: {
      type: 'string',
      maxLength: 100
    },

    email: {
      type: 'string',
      maxLength: 100,
      format: 'email'
    },
  }
}

const updatePersonalData : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {

    companyId: {
      type: 'number',
      required: true
    },

    employeeId: {
      type: 'number',
      required: true
    },

    spolecnost: {
      type: 'number',
    },

    meno: {
      type: 'string',
      maxLength: 255,
      
    },

    stredne_meno: {
      type: 'string',
      maxLength: 255
    },

    priezvisko: {
      type: 'string',
      maxLength: 255,
      
    },

    rodne_cislo: {
      type: 'string',
      maxLength: 10,
      
    },

    datum_nar: {
      type: 'string',
      format: 'date',
      
    },

    pohlavie: {
      type: 'string',
      maxLength: 1,
      
    },

    statna_prislusnost: {
      type: 'string',
      maxLength: 20,
      
    },

    miesto_narodenia: {
      type: 'string',
      maxLength: 100,
      
    },

    stav: {
      type: 'string',
      maxLength: 1,
      
    },

    obciansky: {
      type: 'string',
      maxLength: 25,
      
    },

    pas: {
      type: 'string',
      maxLength: 25,
      
    },

    osobne_cislo: {
      type: 'string',
      maxLength: 10,
      
    },

    externe_osobne_cislo: {
      type: 'string',
      maxLength: 20,
      
    },

    aktivny: {
      type: 'boolean',
      
    },
    
    funkcia: {
      type: 'string',
      maxLength: 50,
      
    },

    pozicia: {
      type: 'string',
      maxLength: 50,
      
    },

    oddelenie: {
      type: 'string',
      maxLength: 20,
      
    },

    pobocka: {
      type: 'string',
      maxLength: 20,
      
    },

    stredisko: {
      type: 'string',
      maxLength: 10,
      
    },

    nastup: {
      type: 'string',
      format: 'date',
      
    },

    ukoncenie: {
      type: 'string',
      format: 'date',
      
    },

    pozn: {
      type: 'string',
      maxLength: 255
    },
    
    adresa_ulica_prechodne: {
      type: 'string',
      maxLength: 100
    },
    
    adresa_cislo_popisne_prechodne: {
      type: 'string',
      maxLength: 100
    },

    adresa_cislo_domu_prechodne: {
      type: 'string',
      maxLength: 100
    },

    psc_prechodne: {
      type: 'string',
      maxLength: 6
    },

    mesto_prechodne: {
      type: 'string',
      maxLength: 100
    },

    okres_prechodne: {
      type: 'string',
      maxLength: 100
    },

    kraj_prechodne: {
      type: 'string',
      maxLength: 100
    },

    krajina_prechodne: {
      type: 'string',
      maxLength: 100
    },

    adresa_ulica_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    adresa_cislo_popisne_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    adresa_cislo_domu_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    psc_trvale: {
      type: 'string',
      maxLength: 6,
      
    },

    mesto_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    okres_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    kraj_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    krajina_trvale: {
      type: 'string',
      maxLength: 100,
      
    },

    telefon_pracovny: {
      type: 'string',
      maxLength: 25,
      
    },

    telefon_sukromny: {
      type: 'string',
      maxLength: 25
    },

    telefon_iny: {
      type: 'string',
      maxLength: 25
    },

    skype: {
      type: 'string',
      maxLength: 100
    },

    email: {
      type: 'string',
      maxLength: 100,
      format: 'email'
    },
  }
}

const removeEmployee : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: 'integer',
      required: true
    },
    employeeId: {
      type: 'integer',
      required: true
    }
  }
}

const calculate : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: 'integer',
      required: true
    },

    employeeId: {
      type: 'integer',
      required: true
    },

    date: {
      type: 'string',
      required: true,
      format: "date"
    }
  }
}

export default {
  createPersonalData,
  updatePersonalData,
  getEmployeesByCompany,
  getEmployeeByIdInCompany,
  removeEmployee,
  calculate
}