package ${TARGET_PACKAGE}

@Getter @Setter
@ToString
public class BoardDataVo {
	
	private Long no;
private Long boardNo;
private String title;
private String content;
private String writerType;
private String writerCd;
private String noticeFlag;
private String status;
private Timestamp regDate;
private Timestamp updateDate;
}
