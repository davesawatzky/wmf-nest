#!/bin/sh

# Database connection details
DB_HOST="172.23.192.1"
DB_PORT="5432"
DB_NAME="wmf2025"
DB_USER="David"
DB_PASSWORD="Dt159753"

# Directory containing SQL files
SQL_DIR="prisma/"

echo "Emptying all tables"
psql -f "prisma/truncate.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"

echo "Seeding tbl_category.sql"
psql -f "prisma/tbl_category.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_class_type.sql"
psql -f "prisma/tbl_class_type.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_discipline.sql"
psql -f "prisma/tbl_discipline.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_user.sql"
psql -f "prisma/tbl_user.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_field_config.sql"
psql -f "prisma/tbl_field_config.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_instruments.sql"
psql -f "prisma/tbl_instruments.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_level.sql"
psql -f "prisma/tbl_level.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_subdiscipline.sql"
psql -f "prisma/tbl_subdiscipline.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_sacred.sql"
psql -f "prisma/tbl_sacred.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_trophy.sql"
psql -f "prisma/tbl_trophy.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_classlist.sql"
psql -f "prisma/tbl_classlist.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_class_trophy.sql"
psql -f "prisma/tbl_class_trophy.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"


echo "Seeding tbl_registration.sql"
psql -f "prisma/tbl_registration.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_unavailable.sql"
psql -f "prisma/tbl_reg_unavailable.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_school.sql"
psql -f "prisma/tbl_reg_school.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_schoolgroup.sql"
psql -f "prisma/tbl_reg_schoolgroup.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_performer.sql"
psql -f "prisma/tbl_reg_performer.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_group.sql"
psql -f "prisma/tbl_reg_group.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_community.sql"
psql -f "prisma/tbl_reg_community.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_communitygroup.sql"
psql -f "prisma/tbl_reg_communitygroup.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_classes.sql"
psql -f "prisma/tbl_reg_classes.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"
echo "Seeding tbl_reg_selection.sql"
psql -f "prisma/tbl_reg_selection.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"


echo "Setting sequence numbers on auto-incremented id fields"
psql -f "prisma/sequence_numbers.sql" -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -W "$DB_PASSWORD"


echo "Seeding complete!"


