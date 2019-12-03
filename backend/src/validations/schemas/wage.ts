const create: Object = {
  type: "object",
  required: true,
  additionalProperties: false,

  properties: {
    companyId: {
      type: "integer",
      required: true
    },

    employeeId: {
      type: "integer",
      required: true
    },

    platnost_od: {
      type: "string",
      required: true,
      format: "date"
    },

    druh: {
      type: "string",
      required: true,
      maxLength: 1
    },

    trieda: {
      type: "string",
      required: true,
      maxLength: 2
    },

    pracovna_doba_typ: {
      type: "string",
      required: true,
      maxLength: 1
    },

    kalendar_typ: {
      type: "integer",
      required: true
    },

    uvazok: {
      type: "number",
      requird: true
    },

    vypocet_sviatkov: {
      type: "string",
      required: true,
      maxLength: 1
    },

    pracovny_pomer_nad_5dni: {
      type: "boolean",
      required: true
    },

    pracovna_schopnost_znizena1: {
      type: "boolean",
      required: true
    },

    pracovna_schopnost_znizena2: {
      type: "boolean",
      required: true
    },

    pracovna_schopnost_znizena3: {
      type: "boolean",
      required: true
    },

    pracovna_kategoria: {
      type: "string",
      required: true,
      maxLength: 1
    },

    staticticky_udaj: {
      type: "string",
      required: true,
      maxLength: 1
    },

    specialna_kategoria: {
      type: "string",
      required: true,
      maxLength: 1
    },

    dochodca: {
      type: "boolean",
      required: true
    },

    dochodok_typ: {
      type: "string",
      required: true,
      maxLength: 1
    },

    pocet_deti: {
      type: "integer",
      required: true
    },

    pocet_deti_do_6: {
      type: "integer",
      required: true
    },

    danovy_odpocet_manzelka: {
      type: "boolean",
      required: true
    },

    danovy_bonus: {
      type: "boolean",
      required: true
    },

    nezdanitelne_min: {
      type: "boolean",
      required: true
    },

    zdravotna_poistovna: {
      type: "integer",
      required: true
    },

    zc_zp: {
      type: "boolean",
      required: true
    },

    zc_sp_dp: {
      type: "boolean",
      required: true
    },

    zc_sp_np: {
      type: "boolean",
      required: true
    },

    zc_sp_pvn: {
      type: "boolean",
      required: true
    },

    zl_zp: {
      type: "boolean",
      required: true
    },

    zl_sp_dp: {
      type: "boolean",
      required: true
    },

    zl_sp_np: {
      type: "boolean",
      required: true
    },

    zl_sp_pvn: {
      type: "boolean",
      required: true
    },

    odbory: {
      type: "string",
      required: true,
      maxLength: 1
    },

    tarif: {
      type: "number",
      required: true
    }
  }
}

const update: Object = {
  type: "object",
  required: true,
  additionalProperties: false,

  properties: {
    companyId: {
      type: "integer",
      required: true
    },

    employeeId: {
      type: "integer",
      required: true
    },

    date: {
      type: "string",
      required: true,
      format: "date"
    },

    platnost_od: {
      type: "string",
      format: "date"
    },

    druh: {
      type: "string",
      maxLength: 1
    },

    trieda: {
      type: "string",
      maxLength: 2
    },

    pracovna_doba_typ: {
      type: "string",
      maxLength: 1
    },

    kalendar_typ: {
      type: "integer"
    },

    uvazok: {
      type: "number"
    },

    vypocet_sviatkov: {
      type: "string",
      maxLength: 1
    },

    pracovny_pomer_nad_5dni: {
      type: "boolean"
    },

    pracovna_schopnost_znizena1: {
      type: "boolean"
    },

    pracovna_schopnost_znizena2: {
      type: "boolean"
    },

    pracovna_schopnost_znizena3: {
      type: "boolean"
    },

    pracovna_kategoria: {
      type: "string",
      maxLength: 1
    },

    staticticky_udaj: {
      type: "string",
      maxLength: 1
    },

    specialna_kategoria: {
      type: "string",
      maxLength: 1
    },

    dochodca: {
      type: "boolean"
    },

    dochodok_typ: {
      type: "string",
      maxLength: 1
    },

    pocet_deti: {
      type: "integer"
    },

    pocet_deti_do_6: {
      type: "integer"
    },

    danovy_odpocet_manzelka: {
      type: "boolean"
    },

    danovy_bonus: {
      type: "boolean"
    },

    nezdanitelne_min: {
      type: "boolean"
    },

    zdravotna_poistovna: {
      type: "integer"
    },

    zc_zp: {
      type: "boolean"
    },

    zc_sp_dp: {
      type: "boolean"
    },

    zc_sp_np: {
      type: "boolean"
    },

    zc_sp_pvn: {
      type: "boolean"
    },

    zl_zp: {
      type: "boolean"
    },

    zl_sp_dp: {
      type: "boolean"
    },

    zl_sp_np: {
      type: "boolean"
    },

    zl_sp_pvn: {
      type: "boolean"
    },

    odbory: {
      type: "string",
      maxLength: 1
    },

    tarif: {
      type: "number",
    }
  }
}

const remove : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: "integer",
      required: true
    },

    employeeId: {
      type: "integer",
      required: true
    },

    date: {
      type: "string",
      required: true,
      format: "date"
    },
  }
}

const getByEmployee : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: "integer",
      required: true
    },

    employeeId: {
      type: "integer",
      required: true
    }
  }
}

const getByEmployeeAndDate : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: "integer",
      required: true
    },

    employeeId: {
      type: "integer",
      required: true
    },

    date: {
      type: "string",
      required: true,
      format: "date"
    }
  }
}

const getByEmployeeAndEffectiveDate : Object = {
  type: 'object',
  required: true,
  additionalProperties: false,
  properties: {
    companyId: {
      type: "integer",
      required: true
    },

    employeeId: {
      type: "integer",
      required: true
    },

    date: {
      type: "string",
      required: true,
      format: "date"
    }
  }
}


export default {
  remove,
  create,
  update,
  getByEmployee,
  getByEmployeeAndDate,
  getByEmployeeAndEffectiveDate
}
