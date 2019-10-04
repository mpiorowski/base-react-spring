DROP SCHEMA IF EXISTS audit CASCADE;
CREATE SCHEMA IF NOT EXISTS audit;

CREATE OR REPLACE FUNCTION process_audit()
    RETURNS TRIGGER AS
$$
DECLARE
    audit_schema_name TEXT = 'audit';
    audit_table_name  TEXT := TG_TABLE_NAME;
    ts                TIMESTAMP := now();
BEGIN
    IF (TG_OP = 'UPDATE')
    THEN

        -- perform update only if change is detected
        IF row_to_json(NEW) :: TEXT = row_to_json(OLD) :: TEXT
        THEN
            RETURN NEW;
        END IF;

        NEW.uid = OLD.uid;
        NEW.version = OLD.version + 1;


        EXECUTE FORMAT('INSERT INTO %I.%I values (%3$s, ''4001-01-01''::timestamp, true, ($1).*)',
                       audit_schema_name, audit_table_name, quote_literal(ts))

            USING NEW;

        -- update old vt and deactivate record
        EXECUTE FORMAT('update %I.%I set valid_to = %3$s, active = false where uid = ($1).uid and version = ($1).version',
                       audit_schema_name, audit_table_name, quote_literal(ts))
            USING OLD;

        RETURN NEW;

    ELSIF (TG_OP = 'INSERT')
    THEN
        EXECUTE FORMAT('INSERT INTO %I.%I values(%3$s, ''4001-01-01''::timestamp, true, ($1).* )',
                       audit_schema_name, audit_table_name, quote_literal(ts))
            USING NEW;

        RETURN NEW;
    END IF;

END;
$$
    LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION enable_audit_on_table(tablename CHARACTER VARYING)
    RETURNS VOID
    LANGUAGE plpgsql
AS $$
DECLARE
    rec RECORD;
BEGIN
    EXECUTE FORMAT('CREATE TABLE if not exists audit.%1$I  (valid_from timestamp, valid_to timestamp, audit_active boolean);',
                   tablename);

    FOR rec IN (SELECT *
                FROM information_schema.columns
                WHERE table_schema = 'public'
                  AND lower(table_name) = lower(tablename)) LOOP

        BEGIN
            EXECUTE FORMAT('alter table audit.%1$I add column %2$I %3$I',
                           tablename, rec.column_name, rec.udt_name);
        EXCEPTION
            WHEN OTHERS
                THEN
                    NULL; -- ignore the error
        END;
    END LOOP;

    EXECUTE FORMAT(
            'DROP TRIGGER IF EXISTS trg_%1$I_audit on %1$I; CREATE TRIGGER trg_%1$I_audit BEFORE UPDATE ON %1$I FOR EACH ROW EXECUTE PROCEDURE process_audit()',
            tablename);

    EXECUTE FORMAT(
            'DROP TRIGGER IF EXISTS trg_%1$I_audit_insert on %1$I; CREATE TRIGGER trg_%1$I_audit_insert AFTER INSERT ON %1$I FOR EACH ROW EXECUTE PROCEDURE process_audit()',
            tablename);

END;
$$;
