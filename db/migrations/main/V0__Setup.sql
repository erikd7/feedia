--UILID setup
CREATE EXTENSION IF NOT EXISTS pgcrypto;

--Creates a ULID that fits into the UUID data type
CREATE OR REPLACE FUNCTION generate_ulid() RETURNS uuid
    AS $$
        SELECT (lpad(to_hex(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint), 12, '0') || encode(gen_random_bytes(10), 'hex'))::uuid;
    $$ LANGUAGE SQL;