--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dejavue; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE dejavue WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'German_Austria.1252';


ALTER DATABASE dejavue OWNER TO postgres;

\connect dejavue

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: kennzeichen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kennzeichen (
    id integer NOT NULL,
    bezirk character varying,
    nummer character varying
);


ALTER TABLE public.kennzeichen OWNER TO postgres;

--
-- Name: kennzeichen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kennzeichen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kennzeichen_id_seq OWNER TO postgres;

--
-- Name: kennzeichen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kennzeichen_id_seq OWNED BY public.kennzeichen.id;


--
-- Name: kennzeichen_kfz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kennzeichen_kfz (
    kennzeichenid integer NOT NULL,
    kfzid integer NOT NULL
);


ALTER TABLE public.kennzeichen_kfz OWNER TO postgres;

--
-- Name: kfz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kfz (
    id integer NOT NULL,
    modell character varying,
    marke character varying,
    gesehen date
);


ALTER TABLE public.kfz OWNER TO postgres;

--
-- Name: kfz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kfz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kfz_id_seq OWNER TO postgres;

--
-- Name: kfz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kfz_id_seq OWNED BY public.kfz.id;


--
-- Name: kennzeichen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kennzeichen ALTER COLUMN id SET DEFAULT nextval('public.kennzeichen_id_seq'::regclass);


--
-- Name: kfz id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kfz ALTER COLUMN id SET DEFAULT nextval('public.kfz_id_seq'::regclass);


--
-- Data for Name: kennzeichen; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.kennzeichen (id, bezirk, nummer) VALUES (1, 'W', '3476 JG');
INSERT INTO public.kennzeichen (id, bezirk, nummer) VALUES (2, 'GR', '329');
INSERT INTO public.kennzeichen (id, bezirk, nummer) VALUES (3, 'M', 'XX 1476');
INSERT INTO public.kennzeichen (id, bezirk, nummer) VALUES (4, 'BP', '911');
INSERT INTO public.kennzeichen (id, bezirk, nummer) VALUES (6, 'W', '81684F');
INSERT INTO public.kennzeichen (id, bezirk, nummer) VALUES (7, 'OW', '12 ab');


--
-- Data for Name: kennzeichen_kfz; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.kennzeichen_kfz (kennzeichenid, kfzid) VALUES (1, 4);
INSERT INTO public.kennzeichen_kfz (kennzeichenid, kfzid) VALUES (2, 5);
INSERT INTO public.kennzeichen_kfz (kennzeichenid, kfzid) VALUES (3, 6);
INSERT INTO public.kennzeichen_kfz (kennzeichenid, kfzid) VALUES (4, 7);
INSERT INTO public.kennzeichen_kfz (kennzeichenid, kfzid) VALUES (6, 8);


--
-- Data for Name: kfz; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.kfz (id, modell, marke, gesehen) VALUES (4, 'A3', 'Audi', '2021-11-09');
INSERT INTO public.kfz (id, modell, marke, gesehen) VALUES (5, '3', 'BMW', '2021-11-09');
INSERT INTO public.kfz (id, modell, marke, gesehen) VALUES (6, 'X1', 'BMW', '2021-10-01');
INSERT INTO public.kfz (id, modell, marke, gesehen) VALUES (7, '911', 'Porsche', '2021-08-16');
INSERT INTO public.kfz (id, modell, marke, gesehen) VALUES (8, 'Zoe', 'Renault', '2020-12-09');


--
-- Name: kennzeichen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kennzeichen_id_seq', 7, true);


--
-- Name: kfz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kfz_id_seq', 8, true);


--
-- Name: kennzeichen_kfz kennzeichen_kfz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kennzeichen_kfz
    ADD CONSTRAINT kennzeichen_kfz_pkey PRIMARY KEY (kennzeichenid, kfzid);


--
-- Name: kennzeichen kennzeichen_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kennzeichen
    ADD CONSTRAINT kennzeichen_pk PRIMARY KEY (id);


--
-- Name: kfz kfz_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kfz
    ADD CONSTRAINT kfz_pk PRIMARY KEY (id);


--
-- Name: kennzeichen_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX kennzeichen_id_uindex ON public.kennzeichen USING btree (id);


--
-- Name: kennzeichen_kfz kennzeichen_kfz_kennzeichenid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kennzeichen_kfz
    ADD CONSTRAINT kennzeichen_kfz_kennzeichenid_fkey FOREIGN KEY (kennzeichenid) REFERENCES public.kennzeichen(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: kennzeichen_kfz kennzeichen_kfz_kfzid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kennzeichen_kfz
    ADD CONSTRAINT kennzeichen_kfz_kfzid_fkey FOREIGN KEY (kfzid) REFERENCES public.kfz(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

