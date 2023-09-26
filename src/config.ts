//https://quizserver.vityazgroup.ru:8034
const port: number = 8305
const protocol: string = 'http'
// const host: string = 'localhost'
const host: string = 'quizserver.vityazgroup.ru'
const apiPrefix: string = 'api'
export const  urlSocket = `${protocol}://${host}:${port}`
export const baseUrl: string = `${protocol}://${host}:${port}/`
export const imageGameUrl = `${baseUrl}game/`
export const imageTaskUrl = `${baseUrl}task/`
export const imageMapUrl = `${baseUrl}map/`
export const imageLogoUrl = `${baseUrl}logo/`
export const  urlApi = `${baseUrl}${apiPrefix}`
export const config = {
  urlUser: urlApi+'/user/',
  urlTask: urlApi+'/task/',
  urlGrade: urlApi+'/grade/',
  urlGame: urlApi+'/game/',
  urlTypeGame: urlApi+'/type-game/',
  urlLogin: urlApi+'/login/',
  urlUploadFile: urlApi+'/image/',
  urlStatistic: urlApi+'/statistic/',
  urlLoadExcelStatistic: urlApi+'/excel/',
  urlLoginGamer: urlApi+'/game-process/login',
}
