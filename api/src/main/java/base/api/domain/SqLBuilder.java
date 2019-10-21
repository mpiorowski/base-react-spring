package base.api.domain;

import org.apache.ibatis.jdbc.SQL;

public class SqLBuilder {

  private SqLBuilder() {}

  public static String selectAll(final String table) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).toString();
  }

  public static String selectByUid(final String table, final String uid) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).WHERE(uid).toString();
  }

  public static String insert(final String table, final String uid) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).WHERE(uid).toString();
  }

  public static String update(final String table, final String uid) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).WHERE(uid).toString();
  }

  public static String delete(final String table, final String uid) {
    SQL sql = new SQL();
    return sql.SELECT("*").FROM(table).WHERE(uid).toString();
  }
}
