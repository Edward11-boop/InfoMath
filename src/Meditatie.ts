export interface Meditatie {
  id: number
  title: string
  description: string
  variant: 'blue' | 'purple' | 'pink'
}

export const info: Meditatie[] = [
  {
    id: 1,
    title: "Matematica pe înțelesul tău",
    description: "Lucrăm concret pe exerciții, modele de examen și situații reale, astfel încât să știi exact ce ai de făcut în fața unei probleme. Îți arăt metode clare, ușor de aplicat, și te ajut să-ți formezi un mod de gândire care te scoate din blocaje. Scopul este să devii independent, nu dependent de explicații.",
    variant: 'blue',
  },
  {
    id: 2,
    title: "Învață informatică pe bune, nu doar pe de rost",
    description: "Lucrăm aplicat, direct pe probleme relevante pentru școală sau examene, dar și pe concepte esențiale (algoritmi, structuri de date, logică). Îți explic fiecare pas și de ce funcționează, iar apoi te ghidez până când poți rezolva singur fără ajutor.",
    variant: 'purple',
  },
  {
    id: 3,
    title: "Învățăm mai ușor, fără presiune inutilă",
    description: "Fiecare elev învață diferit, iar asta contează enorm. De aceea, adaptăm modul de lucru în funcție de tine: ritmul tău, nivelul tău și obiectivele tale. Nu există o rețetă universală construim una care chiar funcționează pentru tine.",
    variant: 'pink',
  },
]