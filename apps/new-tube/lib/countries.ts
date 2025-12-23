export type Country = {
  code: string
  name: string
  path: string
  phoneCode: string
}

export const countries: Country[] = [
  { code: 'cn', name: 'China', path: 'china', phoneCode: '+86' },
  { code: 'in', name: 'India', path: 'india', phoneCode: '+91' },
  { code: 'us', name: 'United States', path: 'us', phoneCode: '+1' },
  { code: 'id', name: 'Indonesia', path: 'indonesia', phoneCode: '+62' },
  { code: 'br', name: 'Brazil', path: 'brazil', phoneCode: '+55' },
  { code: 'pk', name: 'Pakistan', path: 'pakistan', phoneCode: '+92' },
  { code: 'ng', name: 'Nigeria', path: 'nigeria', phoneCode: '+234' },
  { code: 'bd', name: 'Bangladesh', path: 'bangladesh', phoneCode: '+880' },
  { code: 'ru', name: 'Russia', path: 'russia', phoneCode: '+7' },
  { code: 'jp', name: 'Japan', path: 'japan', phoneCode: '+81' },
]

export const getCountryByPath = (path: string): Country | undefined => {
  return countries.find((country) => 
    `${country.path}-phone-number-generator` === path
  )
}
