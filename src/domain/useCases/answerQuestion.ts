import { UniqueEntityID } from '../../core/entities/uniqueEntityId';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answerRepository';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(instructorId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
