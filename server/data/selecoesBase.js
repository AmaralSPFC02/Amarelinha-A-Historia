const selecoesBase = [
  {
    ano: 1970,
    tecnico: "Mário Zagallo",
    inicioCopa: "1970-05-31",
    jogadores: [
      {
        nome: "Félix",
        posicao: "GOL",
        clubeEpoca: "Fluminense",
        nascimento: "1937-12-24",
        idadeCopa: 32,
        titular: true,
        x: 50,
        y: 88,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Carlos Alberto",
        posicao: "DEF",
        clubeEpoca: "Santos",
        nascimento: "1944-07-17",
        idadeCopa: 25,
        titular: true,
        x: 82,
        y: 70,
        estatisticasSelecao: { gols: 8 }
      },
      {
        nome: "Brito",
        posicao: "DEF",
        clubeEpoca: "Flamengo",
        nascimento: "1939-08-09",
        idadeCopa: 30,
        titular: true,
        x: 60,
        y: 72,
        estatisticasSelecao: { gols: 1 }
      },
      {
        nome: "Piazza",
        posicao: "DEF",
        clubeEpoca: "Cruzeiro",
        nascimento: "1944-02-25",
        idadeCopa: 26,
        titular: true,
        x: 40,
        y: 72,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Everaldo",
        posicao: "DEF",
        clubeEpoca: "Grêmio",
        nascimento: "1944-09-11",
        idadeCopa: 25,
        titular: true,
        x: 18,
        y: 70,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Clodoaldo",
        posicao: "MEI",
        clubeEpoca: "Santos",
        nascimento: "1949-09-26",
        idadeCopa: 20,
        titular: true,
        x: 55,
        y: 56,
        estatisticasSelecao: { gols: 1 }
      },
      {
        nome: "Gérson",
        posicao: "MEI",
        clubeEpoca: "São Paulo",
        nascimento: "1941-01-11",
        idadeCopa: 29,
        titular: true,
        x: 45,
        y: 52,
        estatisticasSelecao: { gols: 14 }
      },
      {
        nome: "Jairzinho",
        posicao: "ATA",
        clubeEpoca: "Botafogo",
        nascimento: "1944-12-25",
        idadeCopa: 25,
        titular: true,
        x: 75,
        y: 35,
        estatisticasSelecao: { gols: 33 }
      },
      {
        nome: "Tostão",
        posicao: "ATA",
        clubeEpoca: "Cruzeiro",
        nascimento: "1947-01-25",
        idadeCopa: 23,
        titular: true,
        x: 55,
        y: 28,
        estatisticasSelecao: { gols: 32 }
      },
      {
        nome: "Pelé",
        posicao: "ATA",
        clubeEpoca: "Santos",
        nascimento: "1940-10-23",
        idadeCopa: 29,
        titular: true,
        x: 45,
        y: 22,
        estatisticasSelecao: { gols: 77 }
      },
      {
        nome: "Rivellino",
        posicao: "MEI",
        clubeEpoca: "Corinthians",
        nascimento: "1946-01-01",
        idadeCopa: 24,
        titular: true,
        x: 25,
        y: 35,
        estatisticasSelecao: { gols: 26 }
      },
      {
        nome: "Marco Antônio",
        posicao: "DEF",
        clubeEpoca: "Fluminense",
        nascimento: "1951-02-06",
        idadeCopa: 19,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Ado",
        posicao: "GOL",
        clubeEpoca: "Corinthians",
        nascimento: "1946-07-04",
        idadeCopa: 23,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Roberto",
        posicao: "ATA",
        clubeEpoca: "Botafogo",
        nascimento: "1944-07-31",
        idadeCopa: 25,
        titular: false,
        estatisticasSelecao: { gols: 1 }
      },
      {
        nome: "Baldocchi",
        posicao: "DEF",
        clubeEpoca: "Palmeiras",
        nascimento: "1946-03-14",
        idadeCopa: 24,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Fontana",
        posicao: "DEF",
        clubeEpoca: "Cruzeiro",
        nascimento: "1940-12-31",
        idadeCopa: 29,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Joel",
        posicao: "DEF",
        clubeEpoca: "Santos",
        nascimento: "1946-09-18",
        idadeCopa: 23,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Paulo César",
        posicao: "MEI",
        clubeEpoca: "Botafogo",
        nascimento: "1949-06-16",
        idadeCopa: 20,
        titular: false,
        estatisticasSelecao: { gols: 8 }
      },
      {
        nome: "Edu",
        posicao: "ATA",
        clubeEpoca: "Santos",
        nascimento: "1949-08-06",
        idadeCopa: 20,
        titular: false,
        estatisticasSelecao: { gols: 8 }
      },
      {
        nome: "Dario",
        posicao: "ATA",
        clubeEpoca: "Atlético Mineiro",
        nascimento: "1946-03-04",
        idadeCopa: 24,
        titular: false,
        estatisticasSelecao: { gols: 15 }
      },
      {
        nome: "Zé Maria",
        posicao: "DEF",
        clubeEpoca: "Portuguesa",
        nascimento: "1949-05-18",
        idadeCopa: 21,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Leão",
        posicao: "GOL",
        clubeEpoca: "Palmeiras",
        nascimento: "1949-07-11",
        idadeCopa: 20,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      }
    ]
  },
  {
    ano: 1978,
    tecnico: "Cláudio Coutinho",
    inicioCopa: "1978-06-01",
    jogadores: [
      {
        nome: "Leão",
        posicao: "GOL",
        clubeEpoca: "Palmeiras",
        nascimento: "1949-07-11",
        idadeCopa: 28,
        titular: true,
        x: 50,
        y: 88,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Nelinho",
        posicao: "DEF",
        clubeEpoca: "Cruzeiro",
        nascimento: "1950-07-26",
        idadeCopa: 27,
        titular: true,
        x: 80,
        y: 70,
        estatisticasSelecao: { gols: 8 }
      },
      {
        nome: "Oscar",
        posicao: "DEF",
        clubeEpoca: "Ponte Preta",
        nascimento: "1954-06-20",
        idadeCopa: 23,
        titular: true,
        x: 58,
        y: 73,
        estatisticasSelecao: { gols: 2 }
      },
      {
        nome: "Amaral",
        posicao: "DEF",
        clubeEpoca: "Guarani",
        nascimento: "1954-12-25",
        idadeCopa: 23,
        titular: true,
        x: 42,
        y: 73,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Toninho",
        posicao: "DEF",
        clubeEpoca: "Flamengo",
        nascimento: "1948-06-07",
        idadeCopa: 29,
        titular: true,
        x: 20,
        y: 70,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Toninho Cerezo",
        posicao: "MEI",
        clubeEpoca: "Atlético Mineiro",
        nascimento: "1955-04-21",
        idadeCopa: 23,
        titular: true,
        x: 50,
        y: 58,
        estatisticasSelecao: { gols: 5 }
      },
      {
        nome: "Batista",
        posicao: "MEI",
        clubeEpoca: "Internacional",
        nascimento: "1955-03-08",
        idadeCopa: 23,
        titular: true,
        x: 40,
        y: 55,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Jorge Mendonça",
        posicao: "ATA",
        clubeEpoca: "Palmeiras",
        nascimento: "1954-06-06",
        idadeCopa: 23,
        titular: true,
        x: 65,
        y: 48,
        estatisticasSelecao: { gols: 2 }
      },
      {
        nome: "Dirceu",
        posicao: "MEI",
        clubeEpoca: "Vasco da Gama",
        nascimento: "1952-06-15",
        idadeCopa: 25,
        titular: true,
        x: 35,
        y: 48,
        estatisticasSelecao: { gols: 7 }
      },
      {
        nome: "Roberto Dinamite",
        posicao: "ATA",
        clubeEpoca: "Vasco da Gama",
        nascimento: "1954-04-13",
        idadeCopa: 24,
        titular: true,
        x: 55,
        y: 28,
        estatisticasSelecao: { gols: 20 }
      },
      {
        nome: "Gil",
        posicao: "ATA",
        clubeEpoca: "Botafogo",
        nascimento: "1950-12-24",
        idadeCopa: 27,
        titular: true,
        x: 45,
        y: 28,
        estatisticasSelecao: { gols: 6 }
      },
      {
        nome: "Edinho",
        posicao: "DEF",
        clubeEpoca: "Fluminense",
        nascimento: "1955-06-05",
        idadeCopa: 22,
        titular: false,
        estatisticasSelecao: { gols: 3 }
      },
      {
        nome: "Zé Sérgio",
        posicao: "ATA",
        clubeEpoca: "São Paulo",
        nascimento: "1957-03-08",
        idadeCopa: 21,
        titular: false,
        estatisticasSelecao: { gols: 5 }
      },
      {
        nome: "Zico",
        posicao: "MEI",
        clubeEpoca: "Flamengo",
        nascimento: "1953-03-03",
        idadeCopa: 25,
        titular: false,
        estatisticasSelecao: { gols: 48 }
      },
      {
        nome: "Reinaldo",
        posicao: "ATA",
        clubeEpoca: "Atlético Mineiro",
        nascimento: "1957-01-11",
        idadeCopa: 21,
        titular: false,
        estatisticasSelecao: { gols: 14 }
      },
      {
        nome: "Rivellino",
        posicao: "MEI",
        clubeEpoca: "Fluminense",
        nascimento: "1946-01-01",
        idadeCopa: 32,
        titular: false,
        estatisticasSelecao: { gols: 26 }
      },
      {
        nome: "Carlos",
        posicao: "GOL",
        clubeEpoca: "Ponte Preta",
        nascimento: "1956-03-04",
        idadeCopa: 22,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Abel",
        posicao: "DEF",
        clubeEpoca: "Vasco da Gama",
        nascimento: "1952-09-01",
        idadeCopa: 25,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Polozzi",
        posicao: "DEF",
        clubeEpoca: "Ponte Preta",
        nascimento: "1955-10-01",
        idadeCopa: 22,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Rodrigues Neto",
        posicao: "DEF",
        clubeEpoca: "Botafogo",
        nascimento: "1949-12-06",
        idadeCopa: 28,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Chicão",
        posicao: "MEI",
        clubeEpoca: "São Paulo",
        nascimento: "1949-01-30",
        idadeCopa: 29,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Waldir Peres",
        posicao: "GOL",
        clubeEpoca: "São Paulo",
        nascimento: "1951-01-02",
        idadeCopa: 27,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      }
    ]
  },
  {
    ano: 1982,
    tecnico: "Telê Santana",
    inicioCopa: "1982-06-13",
    jogadores: [
      {
        nome: "Waldir Peres",
        posicao: "GOL",
        clubeEpoca: "São Paulo",
        nascimento: "1951-01-02",
        idadeCopa: 31,
        titular: true,
        x: 50,
        y: 88,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Leandro",
        posicao: "DEF",
        clubeEpoca: "Flamengo",
        nascimento: "1959-03-17",
        idadeCopa: 23,
        titular: true,
        x: 82,
        y: 70,
        estatisticasSelecao: { gols: 2 }
      },
      {
        nome: "Oscar",
        posicao: "DEF",
        clubeEpoca: "São Paulo",
        nascimento: "1954-06-20",
        idadeCopa: 27,
        titular: true,
        x: 58,
        y: 73,
        estatisticasSelecao: { gols: 2 }
      },
      {
        nome: "Luizinho",
        posicao: "DEF",
        clubeEpoca: "Atlético Mineiro",
        nascimento: "1958-10-22",
        idadeCopa: 23,
        titular: true,
        x: 42,
        y: 73,
        estatisticasSelecao: { gols: 2 }
      },
      {
        nome: "Júnior",
        posicao: "DEF",
        clubeEpoca: "Flamengo",
        nascimento: "1954-06-29",
        idadeCopa: 27,
        titular: true,
        x: 18,
        y: 70,
        estatisticasSelecao: { gols: 6 }
      },
      {
        nome: "Toninho Cerezo",
        posicao: "MEI",
        clubeEpoca: "Atlético Mineiro",
        nascimento: "1955-04-21",
        idadeCopa: 27,
        titular: true,
        x: 45,
        y: 58,
        estatisticasSelecao: { gols: 5 }
      },
      {
        nome: "Falcão",
        posicao: "MEI",
        clubeEpoca: "Roma",
        nascimento: "1953-10-16",
        idadeCopa: 28,
        titular: true,
        x: 55,
        y: 58,
        estatisticasSelecao: { gols: 6 }
      },
      {
        nome: "Sócrates",
        posicao: "MEI",
        clubeEpoca: "Corinthians",
        nascimento: "1954-02-19",
        idadeCopa: 28,
        titular: true,
        x: 60,
        y: 42,
        estatisticasSelecao: { gols: 22 }
      },
      {
        nome: "Zico",
        posicao: "MEI",
        clubeEpoca: "Flamengo",
        nascimento: "1953-03-03",
        idadeCopa: 29,
        titular: true,
        x: 40,
        y: 40,
        estatisticasSelecao: { gols: 48 }
      },
      {
        nome: "Éder",
        posicao: "MEI",
        clubeEpoca: "Atlético Mineiro",
        nascimento: "1957-05-25",
        idadeCopa: 25,
        titular: true,
        x: 25,
        y: 34,
        estatisticasSelecao: { gols: 8 }
      },
      {
        nome: "Serginho",
        posicao: "ATA",
        clubeEpoca: "São Paulo",
        nascimento: "1953-12-23",
        idadeCopa: 28,
        titular: true,
        x: 55,
        y: 28,
        estatisticasSelecao: { gols: 8 }
      },
      {
        nome: "Paulo Isidoro",
        posicao: "MEI",
        clubeEpoca: "Grêmio",
        nascimento: "1953-08-03",
        idadeCopa: 28,
        titular: false,
        estatisticasSelecao: { gols: 3 }
      },
      {
        nome: "Paulo Sérgio",
        posicao: "GOL",
        clubeEpoca: "Botafogo",
        nascimento: "1954-07-24",
        idadeCopa: 27,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Edevaldo",
        posicao: "DEF",
        clubeEpoca: "Fluminense",
        nascimento: "1958-01-28",
        idadeCopa: 24,
        titular: false,
        estatisticasSelecao: { gols: 1 }
      },
      {
        nome: "Juninho",
        posicao: "DEF",
        clubeEpoca: "Ponte Preta",
        nascimento: "1958-08-29",
        idadeCopa: 23,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Edinho",
        posicao: "DEF",
        clubeEpoca: "Fluminense",
        nascimento: "1955-06-05",
        idadeCopa: 27,
        titular: false,
        estatisticasSelecao: { gols: 3 }
      },
      {
        nome: "Pedrinho",
        posicao: "DEF",
        clubeEpoca: "Palmeiras",
        nascimento: "1957-10-22",
        idadeCopa: 24,
        titular: false,
        estatisticasSelecao: { gols: 1 }
      },
      {
        nome: "Batista",
        posicao: "MEI",
        clubeEpoca: "Grêmio",
        nascimento: "1955-03-08",
        idadeCopa: 27,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Renato",
        posicao: "MEI",
        clubeEpoca: "São Paulo",
        nascimento: "1957-02-21",
        idadeCopa: 25,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      },
      {
        nome: "Roberto Dinamite",
        posicao: "ATA",
        clubeEpoca: "Vasco da Gama",
        nascimento: "1954-04-13",
        idadeCopa: 28,
        titular: false,
        estatisticasSelecao: { gols: 20 }
      },
      {
        nome: "Dirceu",
        posicao: "ATA",
        clubeEpoca: "Atlético Madrid",
        nascimento: "1952-06-15",
        idadeCopa: 29,
        titular: false,
        estatisticasSelecao: { gols: 7 }
      },
      {
        nome: "Carlos",
        posicao: "GOL",
        clubeEpoca: "Ponte Preta",
        nascimento: "1956-03-04",
        idadeCopa: 26,
        titular: false,
        estatisticasSelecao: { gols: 0 }
      }
    ]
  },
  {
    ano: 2010,
    tecnico: "Dunga",
    inicioCopa: "2010-06-11",
    jogadores: [
      {
        nome: "Júlio César",
        posicao: "GOL",
        clubeEpoca: "Inter (ITA)",
        nascimento: "1979-09-03",
        idadeCopa: 30,
        titular: true,
        x: 50,
        y: 88,
        estatisticasSelecao: { gols: 0, assistencias: 0 }
      },
      {
        nome: "Maicon",
        posicao: "DEF",
        clubeEpoca: "Inter (ITA)",
        nascimento: "1981-07-26",
        idadeCopa: 28,
        titular: true,
        x: 82,
        y: 70,
        estatisticasSelecao: { gols: 7, assistencias: 15 }
      },
      {
        nome: "Lúcio",
        posicao: "DEF",
        clubeEpoca: "Inter (ITA)",
        nascimento: "1978-05-08",
        idadeCopa: 32,
        titular: true,
        x: 58,
        y: 73,
        estatisticasSelecao: { gols: 4, assistencias: 3 }
      },
      {
        nome: "Juan",
        posicao: "DEF",
        clubeEpoca: "AS Roma (ITA)",
        nascimento: "1979-02-01",
        idadeCopa: 31,
        titular: true,
        x: 42,
        y: 73,
        estatisticasSelecao: { gols: 7, assistencias: 3 }
      },
      {
        nome: "Michel Bastos",
        posicao: "DEF",
        clubeEpoca: "Lyon (FRA)",
        nascimento: "1983-08-02",
        idadeCopa: 26,
        titular: true,
        x: 18,
        y: 70,
        estatisticasSelecao: { gols: 1, assistencias: 1 }
      },
      {
        nome: "Felipe Melo",
        posicao: "MEI",
        clubeEpoca: "Juventus (ITA)",
        nascimento: "1983-06-26",
        idadeCopa: 26,
        titular: true,
        x: 45,
        y: 58,
        estatisticasSelecao: { gols: 2, assistencias: 2 }
      },
      {
        nome: "Gilberto Silva",
        posicao: "MEI",
        clubeEpoca: "Panathinaikos (GRE)",
        nascimento: "1976-10-07",
        idadeCopa: 33,
        titular: true,
        x: 55,
        y: 58,
        estatisticasSelecao: { gols: 3, assistencias: 4 }
      },
      {
        nome: "Elano",
        posicao: "MEI",
        clubeEpoca: "Galatasaray (TUR)",
        nascimento: "1981-06-14",
        idadeCopa: 28,
        titular: true,
        x: 65,
        y: 42,
        estatisticasSelecao: { gols: 9, assistencias: 7 }
      },
      {
        nome: "Kaká",
        posicao: "MEI",
        clubeEpoca: "Real Madrid (ESP)",
        nascimento: "1982-04-22",
        idadeCopa: 28,
        titular: true,
        x: 35,
        y: 42,
        estatisticasSelecao: { gols: 29, assistencias: 25 }
      },
      {
        nome: "Robinho",
        posicao: "ATA",
        clubeEpoca: "Santos (BRA)",
        nascimento: "1984-01-25",
        idadeCopa: 26,
        titular: true,
        x: 55,
        y: 28,
        estatisticasSelecao: { gols: 28, assistencias: 26 }
      },
      {
        nome: "Luís Fabiano",
        posicao: "ATA",
        clubeEpoca: "Sevilla (ESP)",
        nascimento: "1980-11-08",
        idadeCopa: 29,
        titular: true,
        x: 45,
        y: 28,
        estatisticasSelecao: { gols: 28, assistencias: 6 }
      },
      {
        nome: "Gomes",
        posicao: "GOL",
        clubeEpoca: "Tottenham Hotspur (ENG)",
        nascimento: "1981-02-15",
        idadeCopa: 29,
        titular: false,
        estatisticasSelecao: { gols: 0, assistencias: 0 }
      },
      {
        nome: "Doni",
        posicao: "GOL",
        clubeEpoca: "AS Roma (ITA)",
        nascimento: "1979-10-22",
        idadeCopa: 30,
        titular: false,
        estatisticasSelecao: { gols: 0, assistencias: 0 }
      },
      {
        nome: "Dani Alves",
        posicao: "DEF",
        clubeEpoca: "Barcelona (ESP)",
        nascimento: "1983-05-06",
        idadeCopa: 27,
        titular: false,
        estatisticasSelecao: { gols: 8, assistencias: 21 }
      },
      {
        nome: "Luisão",
        posicao: "DEF",
        clubeEpoca: "Benfica (POR)",
        nascimento: "1981-02-13",
        idadeCopa: 29,
        titular: false,
        estatisticasSelecao: { gols: 3, assistencias: 1 }
      },
      {
        nome: "Thiago Silva",
        posicao: "DEF",
        clubeEpoca: "AC Milan (ITA)",
        nascimento: "1984-09-22",
        idadeCopa: 25,
        titular: false,
        estatisticasSelecao: { gols: 7, assistencias: 3 }
      },
      {
        nome: "Gilberto",
        posicao: "DEF",
        clubeEpoca: "Cruzeiro (BRA)",
        nascimento: "1976-04-25",
        idadeCopa: 34,
        titular: false,
        estatisticasSelecao: { gols: 1, assistencias: 5 }
      },
      {
        nome: "Josué",
        posicao: "MEI",
        clubeEpoca: "Wolfsburg (GER)",
        nascimento: "1979-07-19",
        idadeCopa: 30,
        titular: false,
        estatisticasSelecao: { gols: 1, assistencias: 0 }
      },
      {
        nome: "Ramires",
        posicao: "MEI",
        clubeEpoca: "Benfica (POR)",
        nascimento: "1987-03-24",
        idadeCopa: 23,
        titular: false,
        estatisticasSelecao: { gols: 4, assistencias: 5 }
      },
      {
        nome: "Júlio Baptista",
        posicao: "MEI",
        clubeEpoca: "AS Roma (ITA)",
        nascimento: "1981-10-01",
        idadeCopa: 28,
        titular: false,
        estatisticasSelecao: { gols: 5, assistencias: 4 }
      },
      {
        nome: "Kleberson",
        posicao: "MEI",
        clubeEpoca: "Flamengo (BRA)",
        nascimento: "1979-06-19",
        idadeCopa: 30,
        titular: false,
        estatisticasSelecao: { gols: 2, assistencias: 6 }
      },
      {
        nome: "Nilmar",
        posicao: "ATA",
        clubeEpoca: "Villarreal (ESP)",
        nascimento: "1984-07-14",
        idadeCopa: 25,
        titular: false,
        estatisticasSelecao: { gols: 9, assistencias: 3 }
      },
      {
        nome: "Grafite",
        posicao: "ATA",
        clubeEpoca: "Wolfsburg (GER)",
        nascimento: "1979-04-02",
        idadeCopa: 31,
        titular: false,
        estatisticasSelecao: { gols: 1, assistencias: 1 }
      }
    ]
  },
];

export default selecoesBase;
