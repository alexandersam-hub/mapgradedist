export class MapDoubleGenerator {
  countTeam: number
  countRound: number
  map: number[][][]
  mapTeams: number[][]
  mapTeamsAll: number[][]
  mapTask: number[][]

  constructor(countTeam: number, countRound: number) {
    this.countRound = countRound
    this.countTeam = countTeam
    this.mapTeams = this.getTeams().reverse()
    this.mapTeamsAll = this.getTeams().reverse()
    this.map = this.getEmptyMap()
    this.mapTask = this.getEmptyMapTask()
  }

  private generateMap() {
    let count = 0
    for (let i = 0; i < this.countRound; i++) {
      // this.mapTeams .reverse()
      for (let j = 0; j < this.countRound; j++) {
        if (this.getCountElementInRow(j) === this.countTeam / 2) {
          continue
        }
        const n = this.getNext(j, i)
        if (n) {
          this.map[j][i] = n
          count++
          if (count === (this.countTeam / 2)) {
            count = 0
            break
          }
        }
      }
    }
  }

  private fillMap(){
   let count = 0
    for (let i = this.countRound - 1; i >= 0; i--) {
      for (let j = this.countRound - 1; j >= 0; j--) {
        if (this.map[j][i].length===2) { continue }
        if (this.getCountElementInRow(j) === this.countTeam / 2) {
          continue
        }
        const n = this.getNextAny(j, i)
        if (n) {
          this.map[j][i] = n
          count++
          if (count === (this.countTeam / 2)) {
            count = 0
            break
          }
        }
      }
    }
  }

  public generate(){
    this.generateMap()
    console.log('****', this.map )
    this.fillMap()
    console.log('****', this.map )
    for (let indexRound = 0; indexRound < this.map.length; indexRound ++){
      for (let indexTask = 0; indexTask < this.map[indexRound].length; indexTask ++) {
        if(this.map[indexRound][indexTask].length === 2) {
          this.mapTask[this.map[indexRound][indexTask][0]][indexRound] = indexTask
          this.mapTask[this.map[indexRound][indexTask][1]][indexRound] = indexTask
        }
      }
    }
    return this.mapTask
  }

  private  getNext(rowIndex:number, columnIndex:number) {
    for (let t of this.mapTeams) {
      let flag = false
      for (let j = 0; j < rowIndex; j++) {
        if (this.map[j][columnIndex] && (this.map[j][columnIndex][0] === t[0] || this.map[j][columnIndex][1] === t[0] || this.map[j][columnIndex][0] === t[1] || this.map[j][columnIndex][1] === t[1])) {
          flag = true
          break
        }
      }
      if (flag) {
        continue
      }
      for (let i = 0; i < columnIndex; i++) {
        if (this.map[rowIndex][i] && (this.map[rowIndex][i][0] === t[0] || this.map[rowIndex][i][1] === t[0] || this.map[rowIndex][i][0] === t[1] || this.map[rowIndex][i][1] === t[1])) {
          flag = true
          break
        }
      }
      if (flag) {
        continue
      }
      this.mapTeams = this.mapTeams.filter(c => c[0] !== t[0] || c[1] !== t[1])
      return t
    }
    return undefined
  }

  private getNextAny(rowIndex: number, columnIndex: number):number[] | undefined {
    for (let t of this.mapTeamsAll) {
      let flag = false
      for (let j = 0; j < this.countRound; j++) {
        if (this.map[j][columnIndex] && (this.map[j][columnIndex][0] === t[0] || this.map[j][columnIndex][1] === t[0] || this.map[j][columnIndex][0] === t[1] || this.map[j][columnIndex][1] === t[1])) {
          flag = true
          break
        }
      }
      if (flag) {
        continue
      }
      for (let i = 0; i < this.countRound; i++) {
        if (this.map[rowIndex][i] && (this.map[rowIndex][i][0] === t[0] || this.map[rowIndex][i][1] === t[0] || this.map[rowIndex][i][0] === t[1] || this.map[rowIndex][i][1] === t[1])) {
          flag = true
          break
        }
      }
      if (flag) {
        continue
      }
      return t
    }
    return undefined
  }

  private getCountElementInRow(rowIndex: number): number {
    let count:number = 0
    for (let i: number = 0; i < this.countRound; i++) {
      if (this.map[rowIndex][i][0] !== -1) {
        count++
      }
    }
    return count
  }

  private getTeams() {
    const t = []
    for (let i = 0; i < this.countTeam - 1; i++) {
      for (let j = i + 1; j < this.countTeam; j++) {
        t.push([i, j])
      }
    }
    return t
  }
  private getEmptyMap() {
    const m: number[][][] = []
    for (let j = 0; j < this.countRound; j++) {
      m.push([])
      for (let i = 0; i < this.countRound; i++) {
        m[j].push([-1])
      }
    }
    return m
  }

  private getEmptyMapTask() {
    const m: number[][] = []
    for (let j = 0; j < this.countTeam; j++) {
      m.push([])
      for (let i = 0; i < this.countRound; i++) {
        m[j].push(-1)
      }
    }
    return m
  }

}
