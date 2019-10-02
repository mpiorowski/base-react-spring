export const operations =
    {
      'Płatność bezgotówkowa z użyciem karty (wpisz za co)': [],
      'Płatność bezgotówkowa z użyciem telefonu (wpisz za co)': [
        'Płatność HCE',
        'Płatność Google Pay',
        'Płatność Apple Pay',
        'Płatność Blik',
      ],
      'Bankomat / wpłatomat': [
        'wypłata gotówki przy pomocy karty',
        'wypłata gotówki przy pomocy BLIK',
        'wpłata gotówki przy pomocy karty',
        'wpłata gotówki przy pomocy BLIK',
        'sprawdzenie stanu konta',
        'inne: jakie?',
      ],
      'Serwis www(iPKO)': [
        'wykonanie przelewu jednorazowego (wpisz jak rodzaj przelew)',
        'zdefiniowanie przelewu cyklicznego',
        'sprawdzenie stanu konta',
        'poszukiwanie informacji (jakiej?)',
        'sprawdzenie/odczytanie wiadomości od banku',
        'sprawdzenie historii przelewów',
        'zakup produktu',
        'sprawdzenie Inwestycji / oszczędności',
        'inne: jakie?',
      ],
      'Aplikacja(IKO)': [
        'wykonanie przelewu jednorazowego (wpisz jak rodzaj przelew)',
        'wygenerowanie kodu BLIK',
        'sprawdzenie stanu konta',
        'odczytanie wiadomości od banku',
        'inne: jakie?',
      ],
      'Strona www banku': [
        'poszukiwanie informacji (wpisz jakiej informacji szukałeś)',
        'poszukiwanie kanałów kontaktu z bankiem',
        'inne: jakie?',
      ],
      'Infolinia': [
        'potrzeba zadania pytania / poszukiwanie informacji (wpisz jakiej informacji szukałeś)',
        'reklamacja / zgłoszenie problemu',
        'zakup produktu',
        'złożenie zlecenia (wpisz, co chciałeś zlecić)',
        'inne: jakie?',
      ],
      'Wizyta w oddziale banku': [
        'wypłata pieniędzy',
        'potrzeba zadania pytania / poszukiwanie informacji (wpisz jakiej informacji szukałeś)',
        'reklamacja / zgłoszenie problemu',
        'poszukiwanie / zakup nowego produktu (wpisz jaki)',
        'złożenie zlecenia (wpisz, co chciałeś zlecić)',
        'rezygnacja z produktu (wpisz jakiego)',
        'inne: jakie?',
      ],
      'Telefon z banku z informacją o ofercie': [],
      'Otrzymanie korespondencji od banku': [
        'email',
        'list',
        'sms',],
      'Kontakt z reklamą / informacją o banku': [
        'reklama TV',
        'reklama zewnętrzna (billboard, telebim)',
        'reklama prasowa / artykuł prasowy',
        'reklama internetowa',
        'inne: jakie?',
      ],
      'Brak aktywności': [],
    };

export const operationsS =
    [
      {
        value: 'Płatność bezgotówkowa z użyciem karty (wpisz za co)',
        label: 'Płatność bezgotówkowa z użyciem karty (wpisz za co)',
        children: [],
      },
      {
        value: 'Płatność bezgotówkowa z użyciem telefonu (wpisz za co)',
        label: 'Płatność bezgotówkowa z użyciem telefonu (wpisz za co)',
        children:
            [
              {
                value: 'Płatność HCE',
                label: 'Płatność HCE',
              },
              {
                value: 'Płatność Google Pay',
                label: 'Płatność Google Pay',
              },
              {
                value: 'Płatność Apple Pay',
                label: 'Płatność Apple Pay',
              },
              {
                value: 'Płatność Blik',
                label: 'Płatność Blik',
              },
            ],
      },
      {
        value: 'Bankomat / wpłatomat',
        label: 'Bankomat / wpłatomat',
        children:
            [
              {
                value: 'wypłata gotówki przy pomocy karty',
                label: 'wypłata gotówki przy pomocy karty',
              },
              {
                value: 'wypłata gotówki przy pomocy BLIK',
                label: 'wypłata gotówki przy pomocy BLIK',
              },
              {
                value: 'wpłata gotówki przy pomocy karty',
                label: 'wpłata gotówki przy pomocy karty',
              },
              {
                value: 'wpłata gotówki przy pomocy BLIK',
                label: 'wpłata gotówki przy pomocy BLIK',
              },
              {
                value: 'sprawdzenie stanu konta',
                label: 'sprawdzenie stanu konta',
              },
              {
                value: 'inne: jakie?',
                label: 'inne: jakie?',
              },
            ],
      }
    ];



