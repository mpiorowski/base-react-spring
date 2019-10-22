package base.api.domain;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

import java.util.UUID;

public class SqLBuilder {

  private SqLBuilder() {}

  public static String selectAll(final String table) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).toString();
  }

  public static String selectByUid(final String table, @Param("uid") final UUID uid) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).WHERE("uid = #{uid}").toString();
  }
}
