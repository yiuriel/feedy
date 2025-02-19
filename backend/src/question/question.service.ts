import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { LLMService } from '../llm/llm.service';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private llmService: LLMService,
  ) {}

  async generateQuestionsForOrganization(
    organizationId: string,
  ): Promise<void> {
    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
    });

    console.log('this will generate questions for', { organization });

    // if (!organization) {
    //   throw new Error(`Organization with id ${organizationId} not found`);
    // }

    // const generateAndSaveQuestion = async () => {
    //   const responses = await this.llmService.generateFeedbackQuestions(
    //     organization.industry,
    //     `to gather anonymous feedback from employees, which is a ${organization.industry} company with ${organization.size} employees.`,
    //   );

    //   // Assuming the LLM service returns a structured response
    //   responses.forEach(async (response) => {
    //     const question = this.questionRepository.create({
    //       text: response.question,
    //       type: response.type as QuestionType,
    //       options: response.options,
    //       organization,
    //     });
    //     console.log({ question });

    //     await this.questionRepository.save(question);
    //   });
    // };

    // // Fire 2 parallel requests to generate questions (2 questions per request)
    // await Promise.all([generateAndSaveQuestion(), generateAndSaveQuestion()]);
  }

  async getQuestionsByOrganization(
    organizationId: string,
  ): Promise<Question[]> {
    return this.questionRepository.find({
      where: {
        organizationId,
        isActive: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
