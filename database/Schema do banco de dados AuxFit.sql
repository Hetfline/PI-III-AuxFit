-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.alimentos (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  nome text NOT NULL,
  favorito boolean DEFAULT false,
  calorias numeric NOT NULL,
  proteinas numeric NOT NULL,
  carboidratos numeric NOT NULL,
  gorduras numeric NOT NULL,
  unidade_base text NOT NULL,
  codigo_barras text,
  marca text,
  tamanho_porcao numeric DEFAULT 100,
  unidade_porcao text DEFAULT 'g'::text,
  CONSTRAINT alimentos_pkey PRIMARY KEY (id)
);
CREATE TABLE public.despensa_itens (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  usuario_fk uuid NOT NULL,
  alimento_fk integer NOT NULL,
  quantidade numeric DEFAULT 1,
  unidade_medida text DEFAULT 'un'::text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT despensa_itens_pkey PRIMARY KEY (id),
  CONSTRAINT despensa_itens_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id),
  CONSTRAINT despensa_itens_alimento_fk_fkey FOREIGN KEY (alimento_fk) REFERENCES public.alimentos(id)
);
CREATE TABLE public.exercicios (
  id smallint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome_exercicio character varying NOT NULL,
  grupo_muscular_geral character varying NOT NULL,
  grupo_muscular_especifico character varying,
  video_url character varying,
  imagem_url character varying,
  descricao text,
  execucao_passos text,
  nivel_dificuldade text CHECK (nivel_dificuldade = ANY (ARRAY['Iniciante'::text, 'Intermediário'::text, 'Avançado'::text])),
  equipamento_necessario text,
  tipo_exercicio text CHECK (tipo_exercicio = ANY (ARRAY['Tradicionais'::text, 'Intensos'::text, 'Mistos'::text])),
  tempo_estimado_execucao interval,
  evita_lesoes text DEFAULT false,
  foco_objetivo text,
  CONSTRAINT exercicios_pkey PRIMARY KEY (id)
);
CREATE TABLE public.historico_exercicios (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  historico_treino_fk integer NOT NULL,
  exercicio_fk integer NOT NULL,
  series_feitas integer,
  repeticoes_feitas integer,
  carga_maxima numeric,
  CONSTRAINT historico_exercicios_pkey PRIMARY KEY (id),
  CONSTRAINT historico_exercicios_historico_treino_fk_fkey FOREIGN KEY (historico_treino_fk) REFERENCES public.historico_treinos(id),
  CONSTRAINT historico_exercicios_exercicio_fk_fkey FOREIGN KEY (exercicio_fk) REFERENCES public.exercicios(id)
);
CREATE TABLE public.historico_sets (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  historico_exercicio_fk integer NOT NULL,
  numero_serie integer,
  repeticoes integer,
  carga numeric,
  rpe integer,
  CONSTRAINT historico_sets_pkey PRIMARY KEY (id),
  CONSTRAINT historico_sets_historico_exercicio_fk_fkey FOREIGN KEY (historico_exercicio_fk) REFERENCES public.historico_exercicios(id)
);
CREATE TABLE public.historico_treinos (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  usuario_fk uuid NOT NULL,
  treino_base_fk integer,
  nome_treino text,
  data_inicio timestamp without time zone DEFAULT now(),
  data_fim timestamp without time zone,
  duracao_segundos integer,
  volume_total numeric,
  CONSTRAINT historico_treinos_pkey PRIMARY KEY (id),
  CONSTRAINT historico_treinos_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id),
  CONSTRAINT historico_treinos_treino_base_fk_fkey FOREIGN KEY (treino_base_fk) REFERENCES public.treinos(id)
);
CREATE TABLE public.perfil_alimentar (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  usuario_fk uuid UNIQUE,
  restricoes_alimentares text,
  refeicoes_dia integer,
  meta_agua integer DEFAULT 2500,
  tipo_dieta text,
  CONSTRAINT perfil_alimentar_pkey PRIMARY KEY (id),
  CONSTRAINT perfil_alimentar_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id)
);
CREATE TABLE public.perfil_treino (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  usuario_fk uuid NOT NULL UNIQUE,
  nivel_experiencia text CHECK (nivel_experiencia = ANY (ARRAY['Iniciante'::text, 'Intermediário'::text, 'Avançado'::text])),
  dias_por_semana integer CHECK (dias_por_semana >= 1 AND dias_por_semana <= 7),
  equipamentos_disponiveis ARRAY,
  limitacoes_lesoes ARRAY,
  tempo_disponivel_minutos integer,
  estilo_treino text CHECK (estilo_treino = ANY (ARRAY['tradicional'::text, 'intenso'::text, 'misto'::text])),
  grupos_musculares_foco ARRAY,
  observacoes_adicionais text,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  CONSTRAINT perfil_treino_pkey PRIMARY KEY (id),
  CONSTRAINT perfil_treino_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id)
);
CREATE TABLE public.progresso_usuario (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  usuario_fk uuid,
  data_registro date DEFAULT CURRENT_DATE,
  peso numeric,
  volume_total numeric,
  agua_ml integer DEFAULT 0,
  CONSTRAINT progresso_usuario_pkey PRIMARY KEY (id),
  CONSTRAINT progresso_usuario_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id)
);
CREATE TABLE public.refeicao_itens (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  refeicao_fk integer,
  alimento_fk integer,
  quantidade numeric,
  unidade_medida text,
  CONSTRAINT refeicao_itens_pkey PRIMARY KEY (id),
  CONSTRAINT refeicao_itens_refeicao_fk_fkey FOREIGN KEY (refeicao_fk) REFERENCES public.refeicoes(id),
  CONSTRAINT refeicao_itens_alimento_fk_fkey FOREIGN KEY (alimento_fk) REFERENCES public.alimentos(id)
);
CREATE TABLE public.refeicoes (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  usuario_fk uuid,
  nome text NOT NULL,
  horario time without time zone,
  tipo_refeicao text CHECK (tipo_refeicao = ANY (ARRAY['cafe_da_manha'::text, 'almoco'::text, 'jantar'::text, 'lanche'::text, 'ceia'::text, 'pre_treino'::text, 'pos_treino'::text])),
  meta_calorias numeric DEFAULT 0,
  data_registro date DEFAULT CURRENT_DATE,
  CONSTRAINT refeicoes_pkey PRIMARY KEY (id),
  CONSTRAINT refeicoes_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id)
);
CREATE TABLE public.treino_exercicios (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  treino_fk integer,
  exercicio_fk integer,
  series integer,
  repeticoes integer,
  carga numeric,
  descanso_segundos integer,
  CONSTRAINT treino_exercicios_pkey PRIMARY KEY (id),
  CONSTRAINT treino_exercicios_treino_fk_fkey FOREIGN KEY (treino_fk) REFERENCES public.treinos(id),
  CONSTRAINT treino_exercicios_exercicio_fk_fkey FOREIGN KEY (exercicio_fk) REFERENCES public.exercicios(id)
);
CREATE TABLE public.treinos (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  usuario_fk uuid,
  nome text NOT NULL,
  areas_foco text,
  duracao integer,
  ativo boolean DEFAULT true,
  CONSTRAINT treinos_pkey PRIMARY KEY (id),
  CONSTRAINT treinos_usuario_fk_fkey FOREIGN KEY (usuario_fk) REFERENCES public.usuarios(id)
);
CREATE TABLE public.usuarios (
  id uuid NOT NULL,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  sexo text CHECK (sexo = ANY (ARRAY['M'::text, 'F'::text, 'Outro'::text])),
  data_nascimento date,
  altura numeric,
  peso_inicial numeric,
  objetivo text,
  created_at timestamp without time zone DEFAULT now(),
  peso_meta numeric,
  avatar_url text,
  nivel_atividade text,
  CONSTRAINT usuarios_pkey PRIMARY KEY (id),
  CONSTRAINT usuarios_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);