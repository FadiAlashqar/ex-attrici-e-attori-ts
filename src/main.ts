type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: 'American' | 'British' | 'Australian' | 'Israeli-American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese',


}


function isActress(data: unknown): data is Actress {
  if (
    data &&
    typeof data === 'object' &&
    'id' in data &&
    typeof data.id === 'number' &&
    'name' in data &&
    typeof data.name === 'string' &&
    'birth_year' in data &&
    typeof data.birth_year === 'number' &&
    (!('death_year' in data) || typeof data.death_year === 'number') &&
    'biography' in data &&
    typeof data.biography === 'string' &&
    'image' in data &&
    typeof data.image === 'string' &&
    'most_famous_movies' in data &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    'awards' in data &&
    typeof data.awards === 'string' &&
    'nationality' in data &&
    typeof data.nationality === 'string' &&
    [
      'American', 'British', 'Australian', 'Israeli-American',
      'South African', 'French', 'Indian', 'Israeli',
      'Spanish', 'South Korean', 'Chinese'
    ].includes(data.nationality)


  ) {
    return true
  }
  else {
    return false
  }
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`)
    const data = await response.json()
    if (isActress(data)) {
      return data
    }
    else {
      throw new Error('I dati non sono nel formato corretto')
    }
  }
  catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
    return null

  }
}

(async () => {
  const actress = await getActress(2)
  console.log(actress)
})()