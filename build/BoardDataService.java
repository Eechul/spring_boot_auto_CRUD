package ${TARGET_PACKAGE}

@Service
public class BoardDataService {

	@Autowired
	private BoardDataRepo boardDataRepo;
	
	public ProcResult save(BoardDataVo boardDataVo) {
		ProcResult proc = ProcResult.make(true);
		
		// 예외처리 알아서
		boardDataRepo.save(boardDataVo);
		return proc;
	}
	
	public BoardDataVo findOne(Long no) {
		return boardDataRepo.findOne(no);
	}
	
	public Pagination<BoardDataVo> list(PageP page, String columnNm, String searchVal) {
		return Pagination.build(boardDataRepo.list(page, columnNm, searchVal), boardDataRepo.list_c(page,columnNm,searchVal), page);
	}
	
	public ProcResult update(Long no) {
		boardDataRepo.delete(no);
		return ProcResult.make(true);
	}

	public ProcResult delete(Long no) {
		boardDataRepo.delete(no);
		return ProcResult.make(true);
	}

}
