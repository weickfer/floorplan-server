import { ConflictError, UnauthorizedError } from "../../../infra/errors/4xx.js";

export class RemoveDisciplineFromProjectUseCase {
  constructor(
    projectDisciplinesRepo
  ) {
    this.projectDisciplinesRepo = projectDisciplinesRepo;
  }

  async execute({ id: disciplineId, projectId }) {
    const discipline = await this.projectDisciplinesRepo.findById(disciplineId)

    if(discipline.projectId !== projectId) {
      throw new UnauthorizedError('Você precisa fazer parte do projeto para realizar essa operação')
    }

    if(discipline?.annotationsCount > 0) {
      throw new ConflictError('Existem anotações associadas a esta disciplina')
    }

    await this.projectDisciplinesRepo.delete(disciplineId)

    return {
      statusCode: 200,
      body: {},
    }
  }
}