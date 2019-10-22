-- categories table
create table forum_categories
(
    category_title       varchar(40)  not null,
    category_description varchar(200) not null,
    category_icon        varchar(40),
    fk_user_id           integer      not null REFERENCES sys_users (id) ON delete RESTRICT,

    id                   serial primary key unique,
    uid                  uuid                  default uuid_generate_v4() unique,
    version              int                   default 1,
    is_active            boolean               default true,
    is_deleted           boolean               default false,
    created_at           timestamptz  not null default now(),
    updated_at           timestamptz  not null default now()
);

-- topics table
create table forum_topics
(
    topic_title    varchar(100) not null,
    topic_views    integer               default 0,
    fk_category_id integer      not null REFERENCES forum_categories (id) ON delete RESTRICT,
    fk_user_id     integer      not null REFERENCES sys_users (id) ON delete RESTRICT,

    id             serial primary key unique,
    uid            uuid                  default uuid_generate_v4() unique,
    version        int                   default 1,
    is_active      boolean               default true,
    is_deleted     boolean               default false,
    created_at     timestamptz  not null default NOW(),
    updated_at     timestamptz  not null default NOW()
);

-- posts table
create table forum_posts
(
    post_content varchar(10000) not null,
    reply_id     integer                 default 0,
    fk_topic_id  integer        not null REFERENCES forum_topics (id) ON delete RESTRICT,
    fk_user_id   integer        not null REFERENCES sys_users (id) ON delete RESTRICT,

    id           serial primary key unique,
    uid          uuid                    default uuid_generate_v4() unique,
    version      int                     default 1,
    is_active    boolean                 default true,
    is_deleted   boolean                 default false,
    created_at   timestamptz    not null default NOW(),
    updated_at   timestamptz    not null default NOW()
);

-- triggers and audits
create trigger set_timestamp
    before update
    on forum_categories
    for each row
EXECUTE procedure trigger_set_timestamp();

select enable_audit_on_table('forum_categories');

create trigger set_timestamp
    before update
    on forum_topics
    for each row
EXECUTE procedure trigger_set_timestamp();

select enable_audit_on_table('forum_topics');

create trigger set_timestamp
    before update
    on forum_posts
    for each row
EXECUTE procedure trigger_set_timestamp();

select enable_audit_on_table('forum_posts');
