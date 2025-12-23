import { cache } from "react"

export type Country = {
  code: string
  name: string
  path: string
  phoneFormat: CountryPhoneFormat
  operators: CountryOperator[]
}

export type CountryPhoneFormat = {
  format: string
  description: string
  rules: string[]
}

export type CountryOperator = {
  name: string
  prefixCodes: string
}


export const countries: Country[] = [
  {
    code: 'cn',
    name: 'China', 
    path: 'china',
    phoneFormat: {
      format: '1XX-XXXX-XXXX',
      description: 'Chinese mobile numbers follow a standardized 11-digit format:',
      rules: [
        'First digit is always \'1\' (mobile prefix)',
        'Next 2 digits indicate the mobile operator',
        'Remaining 8 digits form the subscriber number'
      ]
    },
    operators: [
      {
        name: 'China Mobile (中国移动)',
        prefixCodes: '134-139, 150-153, 157-159, 182-184, 187-188, 147, 178',
      },
      {
        name: 'China Unicom (中国联通)',
        prefixCodes: '130-132, 155-156, 185-186, 145, 176',
      },
      {
        name: 'China Telecom (中国电信)',
        prefixCodes: '133, 149, 153, 177, 180-181, 189',
      }
    ]
  },
  {
    code: 'in',
    name: 'India',
    path: 'india', 
    phoneFormat: {
      format: '+91 XXXXX-XXXXX',
      description: 'Indian mobile numbers follow a standardized 10-digit format:',
      rules: [
        'Country code +91 for India',
        'First digit ranges from 6-9',
        'Remaining 9 digits can be any number'
      ]
    },
    operators: [
      {
        name: 'Reliance Jio',
        prefixCodes: '89, 90, 91, 92, 93, 94, 95, 96, 97',
      },
      {
        name: 'Airtel',
        prefixCodes: '70, 71, 72, 73, 74, 75, 76, 77, 78, 79',
      },
      {
        name: 'Vodafone Idea',
        prefixCodes: '80, 81, 82, 83, 84, 85, 86, 87, 88',
      }
    ]
  },
  {
    code: 'us',
    name: 'United States',
    path: 'united-states',
    phoneFormat: {
      format: '+1 (XXX) XXX-XXXX',
      description: 'US phone numbers follow the North American Numbering Plan (NANP):',
      rules: [
        'Country code +1 for US/Canada',
        'Area code (3 digits) cannot start with 0 or 1',
        'Exchange code (3 digits) followed by subscriber number (4 digits)'
      ]
    },
    operators: [
      {
        name: 'AT&T',
        prefixCodes: '201, 202, 203, 205, 206, 207, 208, 209, 210',
      },
      {
        name: 'Verizon',
        prefixCodes: '212, 213, 214, 215, 216, 217, 218, 219, 220',
      },
      {
        name: 'T-Mobile',
        prefixCodes: '223, 224, 225, 227, 228, 229, 231, 234, 239',
      }
    ]
  },
  {
    code: 'id',
    name: 'Indonesia',
    path: 'indonesia',
    phoneFormat: {
      format: '+62 8XX-XXXX-XXXX',
      description: 'Indonesian mobile numbers typically follow a 10-13 digit format:',
      rules: [
        'Country code +62 for Indonesia',
        'Starts with 8 for mobile numbers',
        'Followed by 1-2 digits for provider code',
        'Remaining 7-8 digits for subscriber number'
      ]
    },
    operators: [
      {
        name: 'Telkomsel',
        prefixCodes: '811, 812, 813, 821, 822, 823, 851, 852, 853',
      },
      {
        name: 'Indosat Ooredoo',
        prefixCodes: '814, 815, 816, 855, 856, 857, 858',
      },
      {
        name: 'XL Axiata',
        prefixCodes: '817, 818, 819, 859, 877, 878, 879',
      }
    ]
  },
  {
    code: 'br',
    name: 'Brazil',
    path: 'brazil',
    phoneFormat: {
      format: '+55 (XX) XXXXX-XXXX',
      description: 'Brazilian mobile numbers follow a standard format:',
      rules: [
        'Country code +55 for Brazil',
        'Area code (2 digits) in parentheses',
        'Mobile numbers start with 9',
        '4 digits followed by hyphen and 4 more digits'
      ]
    },
    operators: [
      {
        name: 'Vivo',
        prefixCodes: '11, 12, 13, 14, 15, 16, 17, 18, 19',
      },
      {
        name: 'Claro',
        prefixCodes: '21, 22, 24, 27, 28, 31, 32, 33, 34',
      },
      {
        name: 'TIM',
        prefixCodes: '41, 42, 43, 44, 45, 46, 47, 48, 49',
      },
      {
        name: 'Oi',
        prefixCodes: '31, 32, 33, 34, 35, 37, 38, 71, 73',
      }
    ]
  },
  {
    code: 'pk',
    name: 'Pakistan',
    path: 'pakistan', 
    phoneFormat: {
      format: '+92 3XX-XXXXXXX',
      description: 'Pakistani mobile numbers follow a standard format:',
      rules: [
        'Country code +92 for Pakistan',
        'Mobile numbers start with 3',
        'Followed by 2 digits for network code',
        '7 digits for subscriber number'
      ]
    },
    operators: [
      {
        name: 'Jazz',
        prefixCodes: '300, 301, 302, 303, 304, 305, 306, 307, 308, 309',
      },
      {
        name: 'Telenor',
        prefixCodes: '340, 341, 342, 343, 344, 345, 346, 347, 348, 349',
      },
      {
        name: 'Zong',
        prefixCodes: '310, 311, 312, 313, 314, 315, 316, 317, 318, 319',
      },
      {
        name: 'Ufone',
        prefixCodes: '330, 331, 332, 333, 334, 335, 336, 337, 338, 339',
      }
    ]
  },
  {
    code: 'ng',
    name: 'Nigeria',
    path: 'nigeria',
    phoneFormat: {
      format: '+234 XXX XXX XXXX',
      description: 'Nigerian mobile numbers follow a standard format:',
      rules: [
        'Country code +234 for Nigeria',
        'Network code (3 digits)',
        'Subscriber number (7 digits)',
        'Total length of 10 digits excluding country code'
      ]
    },
    operators: [
      {
        name: 'MTN',
        prefixCodes: '703, 706, 803, 806, 810, 813, 814, 816, 903, 906',
      },
      {
        name: 'Airtel',
        prefixCodes: '701, 708, 802, 808, 812, 902, 907',
      },
      {
        name: 'Glo',
        prefixCodes: '705, 805, 807, 811, 815, 905',
      },
      {
        name: '9mobile',
        prefixCodes: '809, 817, 818, 908, 909',
      }
    ]
  },
  {
    code: 'bd',
    name: 'Bangladesh',
    path: 'bangladesh',
    phoneFormat: {
      format: '+880 1XX-XXX-XXXX',
      description: 'Bangladeshi mobile numbers follow a standard format:',
      rules: [
        'Country code +880 for Bangladesh',
        'Mobile numbers start with 1',
        'Operator code (1-2 digits)',
        '8 digits for subscriber number'
      ]
    },
    operators: [
      {
        name: 'Grameenphone',
        prefixCodes: '17',
      },
      {
        name: 'Robi',
        prefixCodes: '18',
      },
      {
        name: 'Banglalink',
        prefixCodes: '19',
      },
      {
        name: 'Teletalk',
        prefixCodes: '15',
      }
    ]
  },
  {
    code: 'ru',
    name: 'Russia',
    path: 'russia',
    phoneFormat: {
      format: '+7 (XXX) XXX-XX-XX',
      description: 'Russian mobile numbers follow a standard format:',
      rules: [
        'Country code +7 for Russia',
        'Area code (3 digits) in parentheses',
        '3 digits followed by hyphen',
        '2 digits followed by hyphen and 2 more digits'
      ]
    },
    operators: [
      {
        name: 'MTS',
        prefixCodes: '910, 911, 912, 913, 914, 915, 916, 917, 918, 919',
      },
      {
        name: 'MegaFon',
        prefixCodes: '920, 921, 922, 923, 924, 925, 926, 927, 928, 929',
      },
      {
        name: 'Beeline',
        prefixCodes: '903, 905, 906, 909, 961, 962, 963, 964, 965, 966',
      },
      {
        name: 'Tele2',
        prefixCodes: '950, 951, 952, 953, 958, 977, 991, 992, 993, 994',
      }
    ]
  },
  {
    code: 'jp',
    name: 'Japan',
    path: 'japan',
    phoneFormat: {
      format: '+81 XX-XXXX-XXXX',
      description: 'Japanese mobile numbers follow a standard format:',
      rules: [
        'Country code +81 for Japan',
        'Mobile numbers start with specific carrier codes',
        'Carrier code (2-3 digits)',
        'Followed by 8 digits divided into groups of 4'
      ]
    },
    operators: [
      {
        name: 'NTT Docomo',
        prefixCodes: '70, 80, 90',
      },
      {
        name: 'au by KDDI',
        prefixCodes: '70, 80, 90',
      },
      {
        name: 'SoftBank',
        prefixCodes: '70, 80, 90',
      },
      {
        name: 'Rakuten Mobile',
        prefixCodes: '70',
      }
    ]
  }
]

export const getCountryByPath = cache((path: string): Country | undefined => {
  return countries.find((country) => 
    `${country.path}-phone-number-generator` === path
  )
})
