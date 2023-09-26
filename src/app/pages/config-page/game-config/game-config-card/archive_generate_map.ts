class MapDoubleGenerator {
  countTeam
  countTask
  map:number[][] = []
  pair: string[] = []


  constructor(countTeam:number , countTask: number) {
    this.countTask = countTask
    this.countTeam = countTeam
    this.map = this.generateEmptyMap(countTeam, countTask)
  }

  generateEmptyMap(countTeam:number, countTask:number) {
    const map: number[][] = []
    for (let i = 0; i < countTeam; i++) {
      map.push([])
      for (let j = 0; j < countTask; j++) {
        map[i].push(-1)
      }
    }
    return map
  }

  generate() {
    for (let i = 0; i < this.countTeam; i++) {
      for (let j = 0; j < this.countTask; j++) {
        const next = this.nextTask(i, j)
        this.map[i][j] = next
      }
    }
    return this.map
  }

  nextTask(team:number, round:number) {
    // for (let i = this.countTask - 1; i >= 0; i--) {
    for (let i = 0; i < this.countTask; i++) {
      if (this.map[team].includes(i)) {
        continue
      }
      let count = 0
      let last
      for (let j = 0; j < team + 1; j++) {
        if (this.map[j][round] === i) {
          count++
          last = j
        }
      }
      if (count < 2) {
        if (this.pair.includes('' + last + team)) {
          continue
        } else {
          if (count == 1) {
            this.pair.push('' + last + team)
            this.pair.push('' + team + last)
          }
        }
        return i
      }

    }
    return -1
  }
}
