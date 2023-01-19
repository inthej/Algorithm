/*
모의고사
문제 설명
수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한 조건
시험은 최대 10,000 문제로 구성되어있습니다.
문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.
입출력 예
answers	return
[1,2,3,4,5]	[1]
[1,3,2,4,2]	[1,2,3]
입출력 예 설명
입출력 예 #1

수포자 1은 모든 문제를 맞혔습니다.
수포자 2는 모든 문제를 틀렸습니다.
수포자 3은 모든 문제를 틀렸습니다.
따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.

입출력 예 #2

모든 사람이 2문제씩을 맞췄습니다.
 */
function solution(answers) {
  const countMap = new Map()
  Object.keys(AppTypes.Soopoja).forEach((key) => {
    countMap.set(key, {
      answers: AppNames.SoopojaAnswers(AppTypes.Soopoja[key]),
      count: 0,
    })
  })

  for (const [index, answer] of answers.entries()) {
    Object.keys(AppTypes.Soopoja).forEach((key) => {
      const value = countMap.get(key)
      const { answers: studentAnswers, count } = value
      const studentAnswer = studentAnswers[index % studentAnswers.length]
      if (studentAnswer === answer) {
        countMap.set(key, { ...value, count: count + 1 })
      }
    })
  }

  const maxCount = Math.max.apply(
    null,
    Array.from(countMap).map(([key, val]) => val.count),
  )
  const result = Array.from(countMap)
    .filter(([_, val]) => val.count >= maxCount)
    .map(([key, _]) => AppTypes.Soopoja[key])
    .sort((a, b) => a - b)
  return result
}

const AppTypes = {}
AppTypes.Soopoja = Object.freeze({
  student1: 1,
  student2: 2,
  student3: 3,
})

const AppNames = {}
AppNames.SoopojaAnswers = (type) => {
  switch (type) {
    case AppTypes.Soopoja.student1:
      return [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    case AppTypes.Soopoja.student2:
      return [2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5]
    case AppTypes.Soopoja.student3:
      return [3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    default:
      return []
  }
}

console.log(solution([1, 2, 3, 4, 5]))
console.log(solution([1, 3, 2, 4, 2]))
