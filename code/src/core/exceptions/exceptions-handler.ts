import { BadRequestException, InternalServerErrorException, Logger, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// see: https://www.prisma.io/docs/reference/api-reference/error-reference

export class ExceptionsHandler {
  handleError(error: any) {
    const code = error?.code;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errors = {
        P2000: new BadRequestException(['O valor fornecido para a coluna é muito longo.'], code),
        P2001: new NotFoundException(['O registro procurado com esta condição, não existe.'], code),
        P2002: new InternalServerErrorException(['Restrição de campos únicos falhou.'], code),
        P2003: new InternalServerErrorException(['A restrição de chave estrangeira falhou para este campo'], code),
        P2021: new NotFoundException(['Registro não encontrado. Possível inconsistência com tabelas do banco de dados.'], code),
        P2023: new BadRequestException(['Dados de input inconsistentes.'], code),
        P2024: new RequestTimeoutException(['Expirou a busca de uma nova conexão do pool de conexões com banco de dados.'], code),
        P2025: new NotFoundException(['Registro não encontrado. Nenhuma modificação foi aplicada'], code),
      };
      Logger.error(error, code);
      const exception = errors[code];
      if (exception) {
        throw exception;
      } else {
        throw new InternalServerErrorException(['Erro desconhecido.'], code);
      }
    } else {
      Logger.error(error, 'Erro interno');
      throw new InternalServerErrorException(['Erro interno, por favor entrar em contato com a equipe de suporte.'], code);
    }
  }
}
