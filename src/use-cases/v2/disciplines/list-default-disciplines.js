export class ListDefaultDisciplinesUseCase {
  constructor(disciplinesRepo) {
    this.disciplinesRepo = disciplinesRepo;
  }

  async execute() {
    const disciplines = await this.disciplinesRepo.list()

    return {
      statusCode: 200,
      body: disciplines.map(discipline => ({ 
        id: discipline.id, 
        name: discipline.name, 
        slug: discipline.slug 
      }))
    }
  }
}