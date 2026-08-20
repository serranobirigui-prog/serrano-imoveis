// Script de seed: cria o usuario administrador, a configuracao inicial do site
// e imoveis ficticios de demonstracao.
// Uso: npm run seed  (executa node prisma/seed/seed.js)
// Le as variaveis ADMIN_EMAIL e ADMIN_PASSWORD do arquivo .env

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

function slugify(texto) {
  return texto
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function criarAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@exemplo.com').toLowerCase().trim();
  const senha = process.env.ADMIN_PASSWORD || 'MudarSenha123!';

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    console.log(`Usuario administrador ja existe: ${email}`);
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  await prisma.usuario.create({ data: { nome: 'Administrador', email, senhaHash } });
  console.log(`Usuario administrador criado com sucesso: ${email}`);
}

async function criarConfiguracao() {
  const existente = await prisma.configuracaoSite.findUnique({ where: { id: 1 } });
  if (existente) {
    console.log('Configuracao do site ja existe, mantendo dados atuais.');
    return;
  }

  await prisma.configuracaoSite.create({
    data: {
      id: 1,
      nomeCorretor: 'Corretor Serrano',
      nomeImobiliaria: 'Serrano Corretor de Im\u00f3veis',
      creci: '123165-F',
      whatsapp: '18997164746',
      telefone: '18997164746',
      email: 'contato@imoveisembirigui.com.br',
      instagram: '@serranoimoveis',
      regiaoAtuacao: 'Birigui e regi\u00e3o - SP',
      logoUrl: null,
      fraseApresentacao:
        'Encontre o im\u00f3vel ideal para voc\u00ea e sua fam\u00edlia, com atendimento pr\u00f3ximo e de confian\u00e7a.',
      sobre:
        'H\u00e1 anos atuando no mercado imobili\u00e1rio de Birigui e regi\u00e3o, ajudamos pessoas a encontrar o im\u00f3vel ' +
        'certo para comprar, vender ou alugar. Nosso trabalho \u00e9 baseado em transpar\u00eancia, agilidade e aten\u00e7\u00e3o ' +
        'aos detalhes em cada etapa da negocia\u00e7\u00e3o.',
      enderecoEscritorio: 'Rua Bel\u00e9m, n\u00ba 160, Centro, Birigui-SP, CEP 16200-033',
    },
  });

  console.log('Configuracao inicial do site criada.');
}

const IMOVEIS_DEMO = [
  {
    titulo: 'Casa \u00e0 venda no Jardim das Rosas',
    tipo: 'CASA', finalidade: 'VENDA', status: 'DISPONIVEL',
    preco: 385000, cidade: 'Birigui', bairro: 'Jardim das Rosas',
    endereco: 'Rua das Ac\u00e1cias, 245', cep: '16200-100',
    quartos: 3, banheiros: 2, vagas: 2, areaConstruida: 145, areaTerreno: 250,
    descricao:
      'Excelente casa em bairro residencial tranquilo, com \u00f3tima disposi\u00e7\u00e3o de ambientes e acabamento de ' +
      'qualidade. Sala ampla com p\u00e9 direito alto, cozinha planejada, \u00e1rea de servi\u00e7o separada e quintal com ' +
      'espa\u00e7o para churrasqueira. Localiza\u00e7\u00e3o pr\u00f3xima a escolas, com\u00e9rcio e f\u00e1cil acesso \u00e0 avenida principal.',
    caracteristicas: 'Sala ampla, Cozinha planejada, Quintal, \u00c1rea de servi\u00e7o, Portas de madeira',
    diferenciais: 'Documenta\u00e7\u00e3o em dia, Pr\u00f3ximo a escolas, Reformada recentemente',
    destaque: true,
  },
  {
    titulo: 'Apartamento 2 quartos no Centro',
    tipo: 'APARTAMENTO', finalidade: 'VENDA', status: 'DISPONIVEL',
    preco: 245000, precoCondominio: 280, precoIptu: 45,
    cidade: 'Birigui', bairro: 'Centro', endereco: 'Rua Bel\u00e9m, 320', cep: '16200-040',
    quartos: 2, banheiros: 1, vagas: 1, areaConstruida: 68,
    descricao:
      'Apartamento bem localizado no cora\u00e7\u00e3o de Birigui, a poucos minutos a p\u00e9 do com\u00e9rcio, bancos e ' +
      'servi\u00e7os. Ambientes integrados, boa ventila\u00e7\u00e3o natural e pr\u00e9dio com portaria. Ideal para quem busca ' +
      'praticidade no dia a dia.',
    caracteristicas: 'Portaria, Elevador, Sacada, Ambientes integrados',
    diferenciais: 'Pr\u00f3ximo ao com\u00e9rcio, Baixo custo de condom\u00ednio, Pronto para morar',
    destaque: false,
  },
  {
    titulo: 'Sobrado com piscina no Jardim Bandeirantes',
    tipo: 'SOBRADO', finalidade: 'VENDA', status: 'DISPONIVEL',
    preco: 620000, cidade: 'Birigui', bairro: 'Jardim Bandeirantes', endereco: 'Avenida Rio Branco, 1580',
    quartos: 4, banheiros: 3, vagas: 3, areaConstruida: 220, areaTerreno: 400,
    descricao:
      'Sobrado amplo e sofisticado, com piscina, \u00e1rea gourmet completa e suite master com closet. Projeto ' +
      'moderno com grandes janelas e boa entrada de luz natural em todos os ambientes. Perfeito para quem busca ' +
      'espa\u00e7o e conforto para toda a fam\u00edlia.',
    caracteristicas: 'Piscina, \u00c1rea gourmet, Suite master, Closet, Aquecedor solar',
    diferenciais: 'Alto padr\u00e3o de acabamento, Rua tranquila, Condom\u00ednio fechado nas proximidades',
    destaque: true,
  },
  {
    titulo: 'Terreno plano no Jardim Europa',
    tipo: 'TERRENO', finalidade: 'VENDA', status: 'DISPONIVEL',
    preco: 128000, cidade: 'Birigui', bairro: 'Jardim Europa', endereco: 'Rua das Palmeiras, s/n\u00ba',
    quartos: 0, banheiros: 0, vagas: 0, areaTerreno: 300,
    descricao:
      'Terreno plano, pronto para construir, em loteamento com infraestrutura completa: rua asfaltada, rede de ' +
      'esgoto, energia el\u00e9trica e ilumina\u00e7\u00e3o p\u00fablica. Excelente localiza\u00e7\u00e3o, pr\u00f3ximo a \u00e1reas verdes e com f\u00e1cil ' +
      'acesso \u00e0s principais vias da cidade.',
    caracteristicas: 'Rua asfaltada, Infraestrutura completa, Meio-fio',
    diferenciais: 'Pronto para construir, Documenta\u00e7\u00e3o regularizada',
    destaque: false,
  },
  {
    titulo: 'Casa para alugar no Jardim Planalto',
    tipo: 'CASA', finalidade: 'LOCACAO', status: 'DISPONIVEL',
    preco: 1450, precoIptu: 35,
    cidade: 'Birigui', bairro: 'Jardim Planalto', endereco: 'Rua S\u00e3o Paulo, 88',
    quartos: 2, banheiros: 1, vagas: 1, areaConstruida: 90,
    descricao:
      'Casa t\u00e9rrea, bem cuidada, com quintal e \u00e1rea de servi\u00e7o coberta. Bairro residencial e familiar, com ' +
      'com\u00e9rcio local pr\u00f3ximo e transporte p\u00fablico na porta. Dispon\u00edvel para muda\u00e7a imediata.',
    caracteristicas: 'Quintal, \u00c1rea de servi\u00e7o coberta, Portas novas',
    diferenciais: 'Dispon\u00edvel imediatamente, Bairro tranquilo, Pr\u00f3ximo a transporte p\u00fablico',
    destaque: true,
  },
  {
    titulo: 'Apartamento mobiliado para locar pr\u00f3ximo ao Centro',
    tipo: 'APARTAMENTO', finalidade: 'LOCACAO', status: 'DISPONIVEL',
    preco: 1200, precoCondominio: 250,
    cidade: 'Birigui', bairro: 'Vila Mendon\u00e7a', endereco: 'Rua Piau\u00ed, 410',
    quartos: 1, banheiros: 1, vagas: 1, areaConstruida: 45,
    descricao:
      'Apartamento compacto e mobiliado, ideal para solteiros ou casais. Cozinha equipada, m\u00f3veis planejados e ' +
      'pr\u00e9dio com portaria 24 horas. Localiza\u00e7\u00e3o estrat\u00e9gica, a poucos minutos do centro da cidade.',
    caracteristicas: 'Mobiliado, Cozinha equipada, Portaria 24h',
    diferenciais: 'Pronto para morar, Pr\u00f3ximo ao centro, Sem necessidade de reformas',
    destaque: false,
  },
  {
    titulo: 'Ch\u00e1cara com \u00e1rea de lazer em Birigui',
    tipo: 'CHACARA', finalidade: 'VENDA', status: 'DISPONIVEL',
    preco: 780000, cidade: 'Birigui', bairro: 'Zona Rural', endereco: 'Estrada Municipal, Km 5',
    quartos: 3, banheiros: 2, vagas: 4, areaConstruida: 180, areaTerreno: 5000,
    descricao:
      'Ch\u00e1cara completa com casa sede, piscina, campo de futebol, pomar e \u00e1rea de mata preservada. Ideal para ' +
      'lazer de fim de semana ou moradia definitiva no campo, a poucos minutos do centro da cidade.',
    caracteristicas: 'Piscina, Campo de futebol, Pomar, Po\u00e7o artesiano, Churrasqueira',
    diferenciais: 'Pr\u00f3ximo \u00e0 \u00e1rea urbana, \u00c1gua pr\u00f3pria, Documenta\u00e7\u00e3o regularizada',
    destaque: true,
  },
  {
    titulo: 'Sala comercial no Centro de Birigui',
    tipo: 'SALA_COMERCIAL', finalidade: 'LOCACAO', status: 'DISPONIVEL',
    preco: 1800, precoCondominio: 320,
    cidade: 'Birigui', bairro: 'Centro', endereco: 'Rua Duque de Caxias, 512',
    quartos: 0, banheiros: 1, vagas: 1, areaConstruida: 55,
    descricao:
      'Sala comercial em pr\u00e9dio de f\u00e1cil acesso, pr\u00f3xima ao com\u00e9rcio central de Birigui. Ambiente amplo, ' +
      'banheiro privativo e vaga de garagem. Ideal para escrit\u00f3rios, consult\u00f3rios ou pequenos com\u00e9rcios.',
    caracteristicas: 'Banheiro privativo, Vaga de garagem, Fachada para rua',
    diferenciais: 'Localiza\u00e7\u00e3o central, F\u00e1cil acesso, Pronto para uso',
    destaque: false,
  },
  {
    titulo: 'Casa nova pronta para morar no Jardim Alvorada',
    tipo: 'CASA', finalidade: 'VENDA', status: 'VENDIDO',
    preco: 310000, cidade: 'Birigui', bairro: 'Jardim Alvorada', endereco: 'Rua Minas Gerais, 77',
    quartos: 3, banheiros: 2, vagas: 2, areaConstruida: 120, areaTerreno: 200,
    descricao:
      'Casa nova, nunca habitada, com acabamento moderno e projeto funcional. Cozinha americana integrada \u00e0 sala ' +
      'e \u00e1rea externa com espa\u00e7o para lazer. Financiamento facilitado pela construtora.',
    caracteristicas: 'Cozinha americana, Piso porcelanato, Portas de a\u00e7o',
    diferenciais: 'Im\u00f3vel novo, Financiamento facilitado, Pronto para morar',
    destaque: false,
  },
  {
    titulo: 'Galp\u00e3o industrial na regi\u00e3o de Birigui',
    tipo: 'GALPAO', finalidade: 'LOCACAO', status: 'DISPONIVEL',
    preco: 6500, cidade: 'Birigui', bairro: 'Distrito Industrial', endereco: 'Rodovia Marechal Rondon, Km 410',
    quartos: 0, banheiros: 2, vagas: 6, areaConstruida: 850, areaTerreno: 1200,
    descricao:
      'Galp\u00e3o industrial com p\u00e9 direito alto, doca de carga e descarga, escrit\u00f3rio anexo e amplo p\u00e1tio para ' +
      'manobra de ve\u00edculos pesados. Excelente localiza\u00e7\u00e3o pr\u00f3xima \u00e0 rodovia, ideal para log\u00edstica ou ind\u00fastria.',
    caracteristicas: 'P\u00e9 direito alto, Doca de carga, Escrit\u00f3rio anexo, P\u00e1tio amplo',
    diferenciais: 'Acesso direto \u00e0 rodovia, Estrutura refor\u00e7ada, Documenta\u00e7\u00e3o em dia',
    destaque: false,
  },
];

async function criarImoveisDemo() {
  const totalExistente = await prisma.imovel.count();
  if (totalExistente > 0) {
    console.log(`J\u00e1 existem ${totalExistente} im\u00f3vel(is) no banco. Nenhum im\u00f3vel de demonstra\u00e7\u00e3o foi criado.`);
    return;
  }

  for (const dadosImovel of IMOVEIS_DEMO) {
    const sufixo = Math.random().toString(36).slice(2, 7);
    const slug = `${slugify(dadosImovel.titulo)}-${sufixo}`;

    await prisma.imovel.create({
      data: {
        ...dadosImovel,
        slug,
        publicado: true,
        metaTitle: dadosImovel.titulo,
        metaDescription: dadosImovel.descricao.slice(0, 155),
      },
    });
  }

  console.log(`${IMOVEIS_DEMO.length} im\u00f3veis de demonstra\u00e7\u00e3o criados com sucesso.`);
  console.log('Observa\u00e7\u00e3o: esses im\u00f3veis n\u00e3o possuem fotos. Adicione fotos reais pelo painel administrativo.');
}

async function main() {
  await criarAdmin();
  await criarConfiguracao();
  await criarImoveisDemo();
}

main()
  .catch((erro) => {
    console.error('Erro ao executar o seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
