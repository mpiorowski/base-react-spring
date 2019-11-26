-- tokens table
create table sys_tokens
(
    token      text      not null,
    type       text      not null,
    email      text      not null,
    data       text      not null,

    id         serial primary key unique,
    uid        uuid               default uuid_generate_v4() unique,
    version    int                default 1,
    is_active  boolean            default true,
    is_deleted boolean            default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger set_timestamp
    before update
    on sys_tokens
    for each row
EXECUTE procedure trigger_set_timestamp();

select enable_audit_on_table('sys_tokens');
